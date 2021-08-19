/**
 * @fileoverview Prevent using dangerouslySetInlineStyle on Box for props that are already directly implemented
 *
 * Box supports some props already that are not widely known and instead are being
 * implemented with dangerouslySetInlineStyle. This linter checks for usage of already
 * available props as dangerous styles and suggests the alternative
 */

// @flow strict
import {
  hasImport,
  isGestaltComponent,
  getNodeFromPropName,
  getInlineDefinedStyles,
  getVariableDefinedStyles,
  getVariableNodeInScopeFromName,
} from './eslintASTHelpers.js';
import buildErrorMessagesFromStyleProperties from './noDangerousStyleDuplicatesHelpers.js';
import { type ESLintRule } from './eslintFlowTypes.js';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prevent using dangerouslySetInlineStyle on Box for props that are already directly implemented',
      category: 'Gestalt alternatives',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/Eslint%20Plugin#gestaltno-dangerous-style-duplicates',
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
      disallowed: `Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n{{errorMessage}}`,
    },
  },

  create(context) {
    let gestaltImportNode;

    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    const jSXOpeningElementFnc = (node) => {
      // Check for Gestalt import, Box component, and dangerouslySetInlineStyle prop
      if (!gestaltImportNode) return null;

      const isBox = isGestaltComponent({
        elementNode: node,
        gestaltImportNode,
        componentName: 'Box',
      });

      if (!isBox) return null;

      const attributeNode = getNodeFromPropName({
        elementNode: node,
        propName: 'dangerouslySetInlineStyle',
      });

      if (!attributeNode) return null;

      // Check if style is 1st: declared inline or 2nd: in a variable
      const inlineStyleProperties = getInlineDefinedStyles({ attributeNode });

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

      if (!styleProperties) return null;

      // Check if there are alternatives to the style properties
      const errorMessages = buildErrorMessagesFromStyleProperties({ context, styleProperties });

      if (!errorMessages.length) return null;

      return errorMessages.forEach(
        ({ node: stylePropertyNode, prop: alternativeProp, message: errorMessage }) => {

          return context.report({
            node: stylePropertyNode,
            messageId: 'disallowed',
            data: { errorMessage },
            fix: (fixer) => {
              const tagFixers = renameTagFixer({
                context,
                elementNode: node,
                fixer,
                gestaltImportNode,
                newComponentName: 'Box',
                tagName: 'div',
              });

              const importFixers = updateGestaltImportFixer({
                context,
                gestaltImportNode,
                fixer,
                newComponentName: 'Box',
                programNode,
              });

              const fixers = !importFixerRun ? [...tagFixers, importFixers] : tagFixers;
              importFixerRun = true;
              return fixers;
            },
          });
        },
      );
    };

    return {
      ImportDeclaration: importDeclarationFnc,
      JSXOpeningElement: jSXOpeningElementFnc,
    };
  },
};

export default rule;
