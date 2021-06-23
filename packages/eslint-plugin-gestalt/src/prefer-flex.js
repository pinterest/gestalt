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

        const props = Object.entries(node.attributes)
          .map((item) => item[1])
          .map(({ name, value }) => ({ name: name.name, value: value.value }));

        // eslint-disable-next-line no-unused-vars
        const displayProp = props.find(([key, val]) => key === 'display');
        // No `display` prop or not `display="flex"`
        if (!displayProp || displayProp[1] !== 'flex') {
          return;
        }

        const notFlexProps = props
          .map(({ name }) => name)
          .filter((propName: string) => propName && !sharedProps.includes(propName));

        // Props are set that Flex doesn't support, needs to remain a Box
        if (notFlexProps) {
          return;
        }

        context.report(node, errorMessage);
      },
    };
  },
};

export default rule;
