// @flow strict

/**
 * Error on useless props on `Box`
 */

export const errorMessages = {
  absolute: '`bottom`, `left`, `right`, and `top` must be used with position="absolute"',
  fit: '`fit` sets `maxWidth`, so `maxWidth` should not be specified when `fit` is used',
  flex:
    '`alignContent`, `alignItems`, `direction`, `justifyContent`, and `wrap` must be used with `display="flex"`',
};

const flexProps = ['alignContent', 'alignItems', 'direction', 'justifyContent', 'wrap'];

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
        const isFlexDisplay = props.find((prop) => prop.name === 'display')?.value === 'flex';
        const hasFlexProps = flexProps.some((prop) => propNames.includes(prop));

        if (hasFlexProps && !isFlexDisplay) {
          context.report(node, errorMessages.flex);
        }
      },
    };
  },
};

export default rule;
