/**
 * @fileoverview Disallow marginLeft/marginRight on Box
 *
 * In order to have consistent usage of marginLeft/marginRight on Box in pinboard,
 * we update all of them to marginStart/marginEnd
 */

// @flow strict
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
  'marginLeft/marginRight have been deprecated. Please use marginStart/marginEnd to support Right-to-Left (RTL)\nhttps://gestalt.netlify.app/Box';

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
          return node.imported?.name === 'Box';
        });
      },
      JSXOpeningElement(node) {
        if (!importedComponent) {
          return;
        }

        const isMarginLeftRightAttribute = Object.entries(
          node.attributes,
          // eslint-disable-next-line no-unused-vars
        ).find(([key, value]) =>
          disallowedProps.includes(
            // $FlowFixMe[incompatible-use]
            value && value.name && value.name.name,
          ),
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
