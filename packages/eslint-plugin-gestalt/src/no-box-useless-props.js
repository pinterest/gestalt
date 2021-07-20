// @flow strict

/**
 * Error on useless props on `Box`
 */

export const errorMessages = {
  fit: '`fit` sets `maxWidth`, so `maxWidth` should not be specified when `fit` is used',
  flex:
    '`direction`, `smDirection`, `mdDirection`, `lgDirection`, and `wrap` must be used with `display="flex"`',
  flexGrid:
    '`alignContent`, `alignItems`, and `justifyContent` must be used with `display="flex"`. You can suppress this error if dangerously setting `display="grid"`',
};

const displayPropNames = ['display', 'smDisplay', 'mdDisplay', 'lgDisplay'];

// These are valid for both flexbox and grid layouts
const flexGridPropNames = ['alignContent', 'alignItems', 'justifyContent'];
const flexPropNames = ['direction', `smDirection`, `mdDirection`, `lgDirection`, 'wrap'];

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
        const hasFlexGridProps = flexGridPropNames.some((prop) => propNames.includes(prop));

        if (!isFlexDisplay) {
          if (hasFlexProps) {
            context.report(node, errorMessages.flex);
          } else if (hasFlexGridProps) {
            context.report(node, errorMessages.flexGrid);
          }
        }
      },
    };
  },
};

export default rule;
