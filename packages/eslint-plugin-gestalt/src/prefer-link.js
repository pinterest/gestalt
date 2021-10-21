/**
 * @fileoverview Prefer Link: Prevent anchor tags that only contain attributes matching supported props in Gestalt Link
 */

// @flow strict
import {
  buildKeyValueTypeArray,
  buildProps,
  buildValidatorResponsesFromProperties,
  hasAriaAttributes,
  hasAttributes,
  hasDataAttributes,
  hasImport,
  hasUnsupportedAttributes,
  hasSpreadAttributes,
  isTag,
} from './helpers/eslintASTHelpers.js';
import { renameTagWithPropsFixer, updateGestaltImportFixer } from './helpers/eslintASTFixers.js';
import { type ESLintRule } from './helpers/eslintFlowTypes.js';
import preferLinkReducer from './helpers/preferLinkReducer.js';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer Link: Prevent anchor tags that only contain attributes matching supported props in Gestalt Link. Use Gestalt Link, instead',
      category: 'Gestalt alternatives',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/Eslint%20Plugin#gestaltprefer-link',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          excludeTests: {
            type: 'boolean',
          },
          excludePaths: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      errorMessage: `Use Link from Gestalt: <Link href="">Text</Link>.`,
    },
  },

  create(context) {
    let programNode;
    let gestaltImportNode;
    let importFixerRun = false;

    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    const jSXElementFnc = (node) => {
      const boxDisallowedAttributes = ['className', 'style'];
      const supportedAriaAttributes = ['aria-label', 'aria-selected'];
      const supportedEventAttributes = ['onBlur', 'onClick', 'onFocus', 'onKeyPress'];
      const supportedLinkAttributes = [
        ...supportedAriaAttributes,
        ...supportedEventAttributes,
        'href',
        'id',
        'ref',
        'rel',
        'target',
      ];

      const { excludeTests, excludePaths } = context?.options?.[0] ?? {}; // Access options from Eslint configuration

      const isTest = excludeTests && context.getFilename().endsWith('.test.js');

      const isExcludedPath =
        excludePaths?.length !== 0 &&
        excludePaths?.some((path) => {
          const pathRegex = new RegExp(`${path}`, 'g');
          return pathRegex.test(context.getFilename());
        });

      // First, exit if anchor tag should stay unmodified
      if (
        isTest ||
        isExcludedPath ||
        !isTag({ elementNode: node.openingElement, tagName: 'a' }) ||
        hasSpreadAttributes({ elementNode: node.openingElement }) ||
        hasAttributes({
          elementNode: node.openingElement,
          tagName: 'a',
          attributes: boxDisallowedAttributes,
        }) ||
        hasUnsupportedAttributes({
          elementNode: node.openingElement,
          tagName: 'a',
          supportedAttributes: supportedLinkAttributes,
        }) ||
        hasAriaAttributes({
          elementNode: node.openingElement,
          ignoreAttributes: supportedAriaAttributes,
          tagName: 'a',
        }) ||
        hasDataAttributes({
          elementNode: node.openingElement,
          tagName: 'a',
        })
      ) {
        return null;
      }

      const validatorResponse = buildValidatorResponsesFromProperties({
        context,
        keyValueTypeArray: buildKeyValueTypeArray({
          elementNode: node.openingElement,
          nodeType: 'openingElementNode',
        }),
        reducerCallbackFn: preferLinkReducer,
      });

      // exit if there are not prop alternatives to suggest/autofix
      if (!validatorResponse.map((a) => !!a.prop).filter(Boolean).length) return null;

      const newPropsToAddToLink = validatorResponse
        ?.map((alternative) => alternative.prop)
        .sort()
        .join(' ');

      // For any other anchor tag modification
      return context.report({
        node,
        messageId: 'errorMessage',
        fix: (fixer) => {
          const tagFixers = renameTagWithPropsFixer({
            context,
            elementNode: node,
            fixer,
            gestaltImportNode,
            newComponentName: 'Link',
            modifiedPropsString: buildProps({
              context,
              elementNode: node,
              propSorting: false,
              propsToAdd: newPropsToAddToLink,
              propsToRemove: [
                ...supportedAriaAttributes,
                ...supportedEventAttributes,
                'rel',
                'target',
              ],
            }),
            tagName: 'a',
          });

          const importFixers = updateGestaltImportFixer({
            gestaltImportNode,
            fixer,
            newComponentName: 'Link',
            programNode,
          });

          const fixers = !importFixerRun ? [...tagFixers, importFixers] : tagFixers;
          importFixerRun = true;
          return fixers;
        },
      });
    };

    return {
      Program: (node) => {
        programNode = node;
      },
      ImportDeclaration: importDeclarationFnc,
      JSXElement: jSXElementFnc,
    };
  },
};

export default rule;
