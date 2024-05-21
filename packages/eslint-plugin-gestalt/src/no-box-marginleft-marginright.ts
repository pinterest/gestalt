/**
 * @fileoverview Disallow marginLeft/marginRight on Box
 *
 * In order to have consistent usage of marginLeft/marginRight on Box in pinboard,
 * we update all of them to marginStart/marginEnd
 */

import { ESLintRule } from './helpers/eslintFlowTypes';

const disallowedProps = [
  'marginLeft',
  'smMarginLeft',
  'mdMarginLeft',
  'lgMarginLeft',
  'marginRight',
  'smMarginRight',
  'mdMarginRight',
  'lgMarginRight',
];

export const errorMessage =
  'marginLeft/marginRight have been deprecated. Please use marginStart/marginEnd to support Right-to-Left (RTL)\nhttps://gestalt.pinterest.systems/Box';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce usage of Right-to-Left (RTL)-compliant marginStart/marginEnd over marginLeft/marginRight',
      category: 'Deprecated ESlint rules',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltno-box-marginleft-marginright',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    let importedComponent = false;

    return {
      // @ts-expect-error - TS7006 - Parameter 'decl' implicitly has an 'any' type.
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
        importedComponent = decl.specifiers.some((node) => node.imported.name === 'Box');
      },
      // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
      JSXOpeningElement(node) {
        if (!importedComponent) {
          return;
        }

        const isMarginLeftRightAttribute = Object.entries(node.attributes).find(
          ([_key, value]: [any, any]) =>
            disallowedProps.includes(value && value.name && value.name.name),
        );

        // No marginLeft or marginRight attributes on Box
        if (isMarginLeftRightAttribute) {
          context.report(node, errorMessage);
        }
      },
    };
  },
};

export default rule;
