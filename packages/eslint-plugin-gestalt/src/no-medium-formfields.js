/**
 * @fileoverview Disallow medium form fields
 * @author Christian Vuerings <cvuerings@pinterest.com>
 *
 * In order to have consistent form fields in pinboard, we update all of their sizes to large and disallow medium
 */

// @flow strict
const rule = {
  meta: {
    docs: {
      description: 'Disallow medium form fields',
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
    let localIdentifierName;
    const componentNames = ['SearchField', 'SelectList', 'Tabs', 'TextField'];

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
          ([key, value]) =>
            // $FlowFixMe[incompatible-use]
            value && value.name && value.name.name === 'size',
        );

        // No size defined or size is not "lg"
        // $FlowFixMe[incompatible-use]
        if (!sizeAttribute || sizeAttribute[1].value.value === 'md') {
          context.report(node, 'Gestalt form fields should always have size="lg" set on them');
        }
      },
    };
  },
};

export default rule;
