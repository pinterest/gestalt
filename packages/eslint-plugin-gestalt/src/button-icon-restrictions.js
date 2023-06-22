/**
 * @fileoverview Require specific props when using an icon with Button
 *
 * Gestalt is more permissive than PDS recommends in adding icons to Buttons.
 * Buttons using iconEnd must use:
 * - icon "arrow-down"
 */

// @flow strict
import { type ESLintRule } from './helpers/eslintFlowTypes.js';

export const errorMessage = 'Buttons with="link" using iconEnd must use the "visit" icon';

export const errorMessage2 = 'Buttons using iconEnd must use "arrow-down" icon';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Button icon restrictions',
      category: 'Gestalt restrictions',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltbutton-icon-restrictions',
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
    const componentName = 'Button';

    // $FlowFixMe[missing-local-annot]
    function getAttribute(node, attributeName: string) {
      return Object.entries(node.attributes).find(
        // eslint-disable-next-line no-unused-vars
        ([key, value]) => value && value.name && value.name.name === attributeName,
      );
    }

    function getValue(attribute: void | [string, mixed]) {
      // $FlowFixMe[incompatible-use]
      return attribute ? attribute[1].value.value : null;
    }

    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        importedComponent = decl.specifiers.some((node) => {
          const isValidComponent = node.imported.name === componentName;
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

        const iconAttribute = getAttribute(node, 'iconEnd');
        const iconEndValue = getValue(iconAttribute);

        const roleAttribute = getAttribute(node, 'role');
        const roleValue = getValue(roleAttribute);

        // Not using iconEnd, early return
        if (!iconAttribute) {
          return;
        }
        // Not using correct props
        if (roleValue === 'link' && iconEndValue !== 'visit') {
          context.report(node, errorMessage);
        } else if (roleValue !== 'link' && iconEndValue !== 'arrow-down') {
          context.report(node, errorMessage2);
        }
      },
    };
  },
};

export default rule;
