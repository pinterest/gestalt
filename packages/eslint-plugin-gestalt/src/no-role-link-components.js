/**
 * @fileoverview Disallow role-link on Gestalt components
 *
 * We do not allow role='link' on Button, TapArea, and IconButton.
 * Pinboard alternative with additional functionality must be used instead.
 */

// @flow strict
const rule = {
  meta: {
    docs: {
      description: 'Disallow role-link on Gestalt components',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
      },
    ],
  },

  // $FlowFixMe[unclear-type]
  create(context: Object): Object {
    let importedComponent = false;
    let importedName;

    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        importedComponent = decl.specifiers.some((node) => {
          importedName = node.imported?.name;
          return ['Button', 'TapArea', 'IconButton'].includes(importedName);
        });
      },
      JSXOpeningElement(node) {
        if (!importedComponent) {
          return;
        }

        const isRoleLink = Object.entries(node.attributes).find(
          // eslint-disable-next-line no-unused-vars
          ([key, value]) =>
            value &&
            value.name &&
            value.name.name === 'role' &&
            value.value &&
            // $FlowFixMe[incompatible-use]
            value.value.value === 'link',
        );

        if (isRoleLink) {
          context.report(
            node,
            `${importedName} Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/${importedName}Link.js instead.`,
          );
        }
      },
    };
  },
};

export default rule;
