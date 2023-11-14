/**
 * @fileoverview Disallow medium form fields
 *
 * In order to have consistent form fields in pinboard, we update all of their sizes to large and disallow medium
 */

// @flow strict
import { type ESLintRule } from './helpers/eslintFlowTypes';

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
    let localIdentifierName;
    const componentNames = ['SearchField', 'SelectList', 'TextField', 'ComboBox'];

    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        importedComponent = decl.specifiers.some((node) => {
          const isValidComponent = componentNames.includes(node.imported.name);
          if (isValidComponent) {
            localIdentifierName = node.local.name;
          }
          return isValidComponent;
        });
      },
      JSXOpeningElement(node) {
        if (!importedComponent || localIdentifierName !== node.name.name) {
          return;
        }

        const sizeAttribute = Object.entries(node.attributes).find(
          // eslint-disable-next-line no-unused-vars
          ([key, value]) => value && value.name && value.name.name === 'size',
        );

        // No size defined or size is not "lg"
        if (!sizeAttribute || sizeAttribute[1].value.value === 'md') {
          context.report(node, 'Gestalt form fields should always have size="lg" set on them');
        }
      },
    };
  },
};

export default rule;
