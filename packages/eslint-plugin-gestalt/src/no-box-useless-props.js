/**
 * @fileoverview Error on useless props on `Box`
 */

// @flow strict
import { type ESLintRule } from './eslintFlowTypes.js';

export const errorMessages = {
  fit: '`fit` sets `maxWidth`, so `maxWidth` should not be specified when `fit` is used',
  flex:
    '`direction`, `smDirection`, `mdDirection`, `lgDirection`, and `wrap` must be used with `display="flex", or dangerously set display of "inline-flex", "inline-grid", or "grid"`',
};

const displayPropNames = ['display', 'smDisplay', 'mdDisplay', 'lgDisplay'];

const flexPropNames = [
  'alignContent',
  'alignItems',
  'direction',
  'justifyContent',
  'wrap',
  `lgDirection`,
  `mdDirection`,
  `smDirection`,
];
const dangerousFlexGridDisplays = ['inline-flex', 'grid', 'inline-grid'];

function getAttributeName(attributeName): ?string {
  return attributeName?.name;
}

function getExpressionValues(valueExpression): $ReadOnlyArray<string> {
  return [valueExpression.consequent, valueExpression.alternate].map((option) => option.value);
}

function getAttributeValue(attributeValue): ?(string | $ReadOnlyArray<string>) {
  const staticValue = attributeValue?.value;
  const isBooleanShorthand = attributeValue === null;
  if (staticValue || isBooleanShorthand) {
    return staticValue;
  }

  const valueExpression = attributeValue.expression;
  if (valueExpression.type === 'ConditionalExpression') {
    return getExpressionValues(valueExpression);
  }
  return undefined;
}

// $FlowExpectedError[unclear-type]
function getDangerouslySetStyles(attributeValue): null | { [string]: Object } {
  const valueExpression = attributeValue.expression;
  const styleObject = valueExpression.properties.find(({ key }) => key.name === '__style');
  if (!styleObject) {
    return null;
  }
  return styleObject.value.properties.reduce(
    (acc, { key, value }) => ({
      ...acc,
      [key.name]: value,
    }),
    {},
  );
}

function hasDangerouslySetFlexDisplay(stylesObject): boolean {
  if (!stylesObject || !stylesObject.display) {
    return false;
  }
  const displayValue = stylesObject.display.value ?? getExpressionValues(stylesObject.display);
  if (!displayValue) {
    return false;
  }
  return Array.isArray(displayValue)
    ? displayValue.some((value) => dangerousFlexGridDisplays.includes(value))
    : dangerousFlexGridDisplays.includes(displayValue);
}

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: `Don't allow useless props combinations on Box`,
      category: 'Gestalt restrictions',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/Eslint%20Plugin#gestaltno-box-useless-props',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
      },
    ],
  },

  create(context) {
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

        const props = node.attributes.map(({ name, value }) => ({
          name,
          value,
        }));
        const propNames = props.map(({ name }) => getAttributeName(name));

        // FIT - MAX WIDTH
        const hasFit = propNames.includes('fit');
        const hasMaxWidth = propNames.includes('maxWidth');

        if (hasFit && hasMaxWidth) {
          context.report(node, errorMessages.fit);
        }

        // FLEX PROPS
        const displayProps = props.filter(({ name }) => {
          return displayPropNames.includes(getAttributeName(name));
        });
        const isFlexDisplay = displayProps.some(({ value }) => {
          const propValue = getAttributeValue(value);
          return Array.isArray(propValue) ? propValue.includes('flex') : propValue === 'flex';
        });

        const dangerouslySetInlineStyleProp = props.find(
          ({ name }) => getAttributeName(name) === 'dangerouslySetInlineStyle',
        );
        const isDangerousFlexDisplay = dangerouslySetInlineStyleProp
          ? hasDangerouslySetFlexDisplay(
              getDangerouslySetStyles(dangerouslySetInlineStyleProp.value),
            )
          : false;

        const hasFlexProps = flexPropNames.some((prop) => propNames.includes(prop));

        if (!(isFlexDisplay || isDangerousFlexDisplay) && hasFlexProps) {
          context.report(node, errorMessages.flex);
        }
      },
    };
  },
};

export default rule;
