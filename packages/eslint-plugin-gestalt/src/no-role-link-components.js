/**
 * @fileoverview Disallow role-link on Gestalt components
 * @author Alberto Carreras <acarreras@pinterest.com>
 *
 * We do not allow role='link' on Button, TapArea, and IconButton.
 * Pinboard alternative with additional functionalityp must be used instead.
 */

module.exports = {
  meta: {
    docs: {
      description: 'Disallow role-link on Gestalt components',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    let importedComponent = false;
    let importedName;

    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        importedComponent = decl.specifiers.some((node) => {
          importedName = node.imported.name;
          return ['Button','TapArea','IconButton'].includes(node.imported.name);
        });
      },
      JSXOpeningElement(node) {
        if (!importedComponent) {
          return;
        }

        const isRoleLink = Object.entries(node.attributes).find(([key, value]) => value && value.name && value.name.name === 'role' && value.value && value.value.value === 'link');

        if (isRoleLink) {
          context.report(
            node,
            `${importedName} Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/${importedName}Link.js instead.`
          );
        }
      },
    };
  },
};
