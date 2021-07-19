// @flow strict

/**
 * Error on useless props on `Box`
 */

export const errorMessages = {
  fit: '`fit` sets `maxWidth`, so `maxWidth` should not be specified when `fit` is used',
  flex:
    '`alignContent`, `alignItems`, `direction`, `smDirection`, `mdDirection`, `lgDirection`, `justifyContent`, and `wrap` must be used with `display="flex"`',
};

const displayPropNames = ['display', 'smDisplay', 'mdDisplay', 'lgDisplay'];

const flexPropNames = [
  'alignContent',
  'alignItems',
  'direction',
  `smDirection`,
  `mdDirection`,
  `lgDirection`,
  'justifyContent',
  'wrap',
];

const rule = {
  meta: {
    docs: {
      description: 'Do not allow useless props combinations on Box',
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
    let localBoxName = false;

    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        localBoxName = decl.specifiers.find((node) => {
          return node.imported.name === 'Box';
        })?.local?.name;
      },
      JSXOpeningElement(node) {
        if (!localBoxName || node?.name?.name !== localBoxName) {
          return;
        }

        const props = Object.keys(node.attributes).map((key: string) => ({
          name: node.attributes[key]?.name?.name,
          value: node.attributes[key]?.value?.value,
        }));
        const propNames = props.map((prop) => prop.name);

        // FIT - MAX WIDTH
        const hasFit = propNames.includes('fit');
        const hasMaxWidth = propNames.includes('maxWidth');

        if (hasFit && hasMaxWidth) {
          context.report(node, errorMessages.fit);
        }

        // FLEX PROPS
        const displayProps = props.filter((prop) => displayPropNames.includes(prop.name));
        const isFlexDisplay = displayProps.some((prop) => prop.value === 'flex');
        const hasFlexProps = flexPropNames.some((prop) => propNames.includes(prop));

        if (hasFlexProps && !isFlexDisplay) {
          context.report(node, errorMessages.flex);
        }
      },
    };
  },
};

export default rule;
