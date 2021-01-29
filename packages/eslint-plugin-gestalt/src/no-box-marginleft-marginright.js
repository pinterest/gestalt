/**
 * @fileoverview Disallow marginLeft/marginRight on Box
 * @author Vincent Tian <vincent@pinterest.com>
 *
 * In order to have consistent usage of marginLeft/marginRight on Box in pinboard,
 * we update all of them to marginStart/marginEnd
 */

// @flow strict
const rule = {
  meta: {
    docs: {
      description:
        'Enforce usage of Right-to-Left (RTL)-compliant marginStart/marginEnd over marginLeft/marginRight',
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

    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        importedComponent = decl.specifiers.some((node) => {
          return node.imported.name === 'Box';
        });
      },
      JSXOpeningElement(node) {
        if (!importedComponent) {
          return;
        }

        const isMarginLeftRightAttribute = Object.entries(
          node.attributes
          // eslint-disable-next-line no-unused-vars
        ).find(([key, value]) =>
          ['marginLeft', 'marginRight'].includes(
            // $FlowFixMe[incompatible-use]
            value && value.name && value.name.name
          )
        );

        // No marginLeft or marginRight attributes on Box
        if (isMarginLeftRightAttribute) {
          context.report(
            node,
            'Box should use marginStart/marginEnd instead of marginLeft/marginRight to support Right-to-Left (RTL)\nhttps://gestalt.netlify.app/Box'
          );
        }
      },
    };
  },
};

export default rule;
