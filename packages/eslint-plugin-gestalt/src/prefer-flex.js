/**
 * @fileoverview Encourage the use of Flex instead of Box
 *
 * We prefer using Flex over Box to better separate concerns and to encourage
 * the usage of `gap`. This linter checks for usage of Box that could be Flex
 * given the used props.
 */

// @flow strict
const sharedProps = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'children',
  'direction',
  'flex',
  'height',
  'justifyContent',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'overflow',
  'width',
  'wrap',
];

export const errorMessage =
  "Please use Flex for flexbox layouts. If you are wrapping children in Boxes to set margin/padding, try using Flex's `gap` prop instead!";

const rule = {
  meta: {
    docs: {
      description: 'Encourage usage of Flex instead of Box',
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
        const props = node.attributes.map(({ name, value }) => ({
          key: name.name,
          value: value.value,
        }));

        const displayProp = props.find(({ key }) => key === 'display');
        // No `display` prop or not `display="flex"`
        if (!displayProp || displayProp.value !== 'flex') {
          return;
        }

        const notFlexProps = props
          .filter(({ key }) => key !== 'display')
          .filter(({ key }) => !sharedProps.includes(key));

        // Props are set that Flex doesn't support, needs to remain a Box
        if (notFlexProps.length > 0) {
          return;
        }

        context.report(node, errorMessage);
      },
    };
  },
};

export default rule;
