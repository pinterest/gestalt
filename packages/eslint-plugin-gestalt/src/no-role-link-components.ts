/**
 * @fileoverview Disallow role-link on Gestalt components
 *
 * We do not allow role='link' on Button, TapArea, and IconButton.
 * Pinboard alternative with additional functionalityp must be used instead.
 */

import { ESLintRule } from './helpers/eslintFlowTypes';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow role-link on Gestalt components',
      category: 'Deprecated ESlint rules',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltno-role-link-components',
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
// @ts-expect-error - TS7034 - Variable 'importedName' implicitly has type 'any' in some locations where its type cannot be determined.
    let importedName;

    return {
// @ts-expect-error - TS7006 - Parameter 'decl' implicitly has an 'any' type.
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
// @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
        importedComponent = decl.specifiers.some((node) => {
          importedName = node.imported.name;
          return ['Button', 'TapArea', 'IconButton'].includes(node.imported.name);
        });
      },
// @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
      JSXOpeningElement(node) {
        if (!importedComponent) {
          return;
        }

        const isRoleLink = Object.entries(node.attributes).find(
          ([_key, value]: [any, any]) =>
            value &&
            value.name &&
            value.name.name === 'role' &&
            value.value &&
            value.value.value === 'link',
        );

        if (isRoleLink) {
          context.report(
            node,
// @ts-expect-error - TS7005 - Variable 'importedName' implicitly has an 'any' type. | TS7005 - Variable 'importedName' implicitly has an 'any' type.
            `${importedName} Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/${importedName}Link.js instead.`,
          );
        }
      },
    };
  },
};

export default rule;
