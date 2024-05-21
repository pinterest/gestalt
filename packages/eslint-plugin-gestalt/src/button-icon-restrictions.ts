/**
 * @fileoverview Require specific props when using an icon with Button
 *
 * Gestalt is more permissive than PDS recommends in adding icons to Buttons.
 * Buttons using iconEnd must use:
 * - icon "arrow-down"
 */

import { ESLintRule } from './helpers/eslintFlowTypes';

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
// @ts-expect-error - TS7034 - Variable 'localIdentifierName' implicitly has type 'any' in some locations where its type cannot be determined.
    let localIdentifierName;
    const componentName = 'Button';

// @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
    function getAttribute(node, attributeName: string) {
      return Object.entries(node.attributes).find(
        ([_key, value]: [any, any]) => value && value.name && value.name.name === attributeName,
      );
    }

    function getValue(attribute?: [string, unknown]) {
// @ts-expect-error - TS2571 - Object is of type 'unknown'.
      return attribute ? attribute[1].value.value : null;
    }

    return {
// @ts-expect-error - TS7006 - Parameter 'decl' implicitly has an 'any' type.
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
// @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
        importedComponent = decl.specifiers.some((node) => {
          const isValidComponent = node.imported.name === componentName;
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
