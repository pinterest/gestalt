/**
 * @fileoverview Disallow medium form fields
 *
 * In order to have consistent form fields in pinboard, we update all of their sizes to large and disallow medium
 */

import { ESLintRule } from './helpers/eslintFlowTypes';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow medium form fields',
      category: 'Gestalt restrictions',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltno-medium-formfields',
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
    // @ts-expect-error - TS7034 - Variable 'localIdentifierName' implicitly has type 'any' in some locations where its type cannot be determined.
    let localIdentifierName;
    const componentNames = ['SearchField', 'SelectList', 'TextField', 'ComboBox'];

    return {
      // @ts-expect-error - TS7006 - Parameter 'decl' implicitly has an 'any' type.
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
        importedComponent = decl.specifiers.some((node) => {
          const isValidComponent = componentNames.includes(node.imported.name);
          if (isValidComponent) {
            localIdentifierName = node.local.name;
          }
          return isValidComponent;
        });
      },
      // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
      JSXOpeningElement(node) {
        // @ts-expect-error - TS7005 - Variable 'localIdentifierName' implicitly has an 'any' type.
        if (!importedComponent || localIdentifierName !== node.name.name) {
          return;
        }

        const sizeAttribute = Object.entries(node.attributes).find(
          ([_key, value]: [any, any]) => value && value.name && value.name.name === 'size',
        );

        // No size defined or size is not "lg"
        // @ts-expect-error - TS2571 - Object is of type 'unknown'.
        if (!sizeAttribute || sizeAttribute[1].value.value === 'md') {
          context.report(node, 'Gestalt form fields should always have size="lg" set on them');
        }
      },
    };
  },
};

export default rule;
