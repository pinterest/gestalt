/**
 * @fileoverview Prevent using dangerouslySetInlineStyle on Box for props that are already directly implemented
 *
 * Box supports some props already that are not widely known and instead are being
 * implemented with dangerouslySetInlineStyle. This linter checks for usage of already
 * available props as dangerous styles and suggests the alternative
 */

// @flow strict
import { renameTagWithPropsFixer, updateGestaltImportFixer } from './helpers/eslintASTFixers.js';
import {
  buildKeyValueTypeArray,
  buildProps,
  buildValidatorResponsesFromProperties,
  getInlineDefinedStyles,
  getNodeFromPropName,
  getTextNodeFromSourceCode,
  getVariableDefinedStyles,
  getVariableNodeInScopeFromName,
  hasImport,
  isGestaltComponent,
} from './helpers/eslintASTHelpers.js';
import { type ESLintRule } from './helpers/eslintFlowTypes.js';
import { buildNoBoxDangerousStyleDuplicatesReducer } from './helpers/noBoxDangerousStyleDuplicatesReducer.js';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prevent using dangerouslySetInlineStyle on Box for props that are already directly implemented',
      category: 'Gestalt restrictions',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltno-box-dangerous-style-duplicates',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          onlyKeys: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      disallowed: `Unnecessary Box dangerous styles found. https://gestalt.pinterest.systems/Box\n{{errorMessage}}`,
    },
  },

  create(context) {
    let programNode;
    let gestaltImportNode;
    let isImportFixerExecuted = false;
    let addFixedZIndex = false;

    // $FlowFixMe[missing-local-annot]
    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    // $FlowFixMe[missing-local-annot]
    const jSXOpeningElementFnc = (node) => {
      // exit if Gestalt is not imported
      if (!gestaltImportNode) return null;

      const isBox = isGestaltComponent({
        elementNode: node,
        gestaltImportNode,
        componentName: 'Box',
      });

      // exit if not Box component
      if (!isBox) return null;

      const attributeNode = getNodeFromPropName({
        elementNode: node,
        propName: 'dangerouslySetInlineStyle',
      });

      // exit if not dangerouslySetInlineStyle prop
      if (!attributeNode) return null;

      // eslint-disable-next-line prefer-regex-literals
      const styleValuesRegex = new RegExp(
        /dangerouslySetInlineStyle={{[\s\S]*__style:[\s\S]*{([\s\S]+)}[\s\S]*}[\s\S]*}/,
        'i',
      );

      // eslint-disable-next-line prefer-regex-literals
      const ignoreCharsRegex = new RegExp(/\?|\+|\*|&|\$|\/|\|/g);

      const completeDangerouslySetInlineStyle = getTextNodeFromSourceCode({
        context,
        elementNode: attributeNode,
      });

      // some edge case characters make cleaning the string dangerouslySetInlineStyle highly complex, just messaging with options, not fixing
      const isFixable = !ignoreCharsRegex.test(completeDangerouslySetInlineStyle ?? '');

      // reconstructedDangerouslySetInlineStyle contains a string with the dangerouslySetInlineStyle styles
      let reconstructedDangerouslySetInlineStyle = isFixable
        ? completeDangerouslySetInlineStyle
            .replace(/\s/g, '') // remove all spaces
            .match(styleValuesRegex)?.[1]
        : ''; // match regex

      // 1st: Check if style is declared inline
      const inlineStyleProperties = getInlineDefinedStyles({ attributeNode });

      // 2nd: If style is not declared inline, check if style is declared in a variable
      let variableDefinedStyleProperties;
      if (!inlineStyleProperties && attributeNode?.value?.expression?.name) {
        // Access the node of the variable -within scope- being passed
        const variableNode = getVariableNodeInScopeFromName({
          context,
          nodeElement: node,
          name: attributeNode.value.expression.name,
        });

        variableDefinedStyleProperties = getVariableDefinedStyles({ variableNode });
      }

      const styleProperties = inlineStyleProperties ?? variableDefinedStyleProperties;

      // exit if style properties are not found
      if (!styleProperties) return null;

      // Check if there are Gestalt alternatives to the style properties to suggest/autofix
      const validatorResponse = buildValidatorResponsesFromProperties({
        context,
        keyValueTypeArray: buildKeyValueTypeArray({
          elementNode: styleProperties,
          nodeType: 'styleProperties',
        }),
        reducerCallbackFn: buildNoBoxDangerousStyleDuplicatesReducer,
      });

      // exit if there are not style properties alternatives to suggest/autofix
      if (!validatorResponse.map((a) => !!a.prop).filter(Boolean).length) return null;

      const newPropsToAddToBox = validatorResponse
        ?.map((alternative) => {
          if (typeof alternative.prop === 'string' && alternative.prop.startsWith('zIndex')) {
            addFixedZIndex = true;
          }
          return alternative.prop;
        })
        .sort()
        .join(' ');

      const attributesToRemoveFromDangerouslySetInlineStyle = isFixable
        ? validatorResponse.map(
            (alternative) =>
              getTextNodeFromSourceCode({ context, elementNode: alternative.node }).replace(
                /\s/g,
                '',
              ), // remove spaces from attribute match,
          )
        : [];

      const errorMessage = validatorResponse.map((alternative) => alternative.message).join('\n');

      // remove attributes for which there's a Gestalt alternative being suggested/fixes
      if (isFixable) {
        attributesToRemoveFromDangerouslySetInlineStyle.forEach((attribute) => {
          reconstructedDangerouslySetInlineStyle = reconstructedDangerouslySetInlineStyle?.replace(
            attribute,
            '',
          );
        });
      }

      const isDangerouslySetInlineStyleEmptyAfterFix =
        styleProperties.length - validatorResponse.length === 0;

      const dangerouslySetInlineStyle =
        isDangerouslySetInlineStyleEmptyAfterFix || !isFixable
          ? '' // optimization, prop unused and removed
          : `dangerouslySetInlineStyle={{ __style: { ${
              reconstructedDangerouslySetInlineStyle
                ?.replace(/,+/g, ',') // remove double commas after attribute removal
                .replace(/^,/, '') // remove starting commas
                .replace(/,$/, '') // remove trailing commas
                .replace(/[,]/g, ', ') // add back space after commas
                .replace(/[:]/g, ': ') ?? // add back space after colons
              ''
            } } }}`;

      const reconstructedBoxProps = `${newPropsToAddToBox} ${dangerouslySetInlineStyle ?? ''}`;

      const builtProps = isFixable
        ? buildProps({
            context,
            elementNode: node,
            propsToAdd: isDangerouslySetInlineStyleEmptyAfterFix
              ? newPropsToAddToBox
              : reconstructedBoxProps,
            propsToRemove: ['dangerouslySetInlineStyle'],
          })
        : '';

      return context.report({
        node,
        messageId: 'disallowed',
        data: { errorMessage },
        fix: isFixable
          ? (fixer) => {
              const tagFixers = renameTagWithPropsFixer({
                context,
                elementNode: node,
                fixer,
                gestaltImportNode,
                newComponentName: 'Box',
                modifiedPropsString: builtProps,
                tagName: 'Box',
              });

              const importFixers = updateGestaltImportFixer({
                fixer,
                gestaltImportNode,
                newComponentName: 'FixedZIndex',
                programNode,
              });

              const fixers =
                addFixedZIndex && !isImportFixerExecuted ? [...tagFixers, importFixers] : tagFixers;
              isImportFixerExecuted = true;

              return fixers;
            }
          : null,
      });
    };

    return {
      Program: (node) => {
        programNode = node;
      },
      ImportDeclaration: importDeclarationFnc,
      JSXOpeningElement: jSXOpeningElementFnc,
    };
  },
};

export default rule;
