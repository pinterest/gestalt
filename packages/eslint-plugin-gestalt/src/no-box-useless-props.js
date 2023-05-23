/**
 * @fileoverview Error on useless props on `Box`
 */

// @flow strict
import { type ESLintRule } from './helpers/eslintFlowTypes.js';

export const errorMessages = {
  fit: '`fit` sets `maxWidth`, so `maxWidth` should not be specified when `fit` is used',
  flex: '`direction`, `smDirection`, `mdDirection`, `lgDirection`, and `wrap` must be used with `display="flex", or dangerously set display of "inline-flex", "inline-grid", or "grid"`',
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

// $FlowFixMe[missing-local-annot]
function getAttributeName(attributeName): ?string {
  return attributeName?.name;
}

function getExpressionValues(valueExpression: {|
  value: string,
  consequent: {| value: string |},
  alternate: {| value: string |},
|}): $ReadOnlyArray<string> {
  return [valueExpression.consequent, valueExpression.alternate].map((option) => option.value);
}

// $FlowFixMe[missing-local-annot]
function getAttributeValue(attributeValue): ?(string | $ReadOnlyArray<string>) {
  const staticValue = attributeValue?.value;
  const isBooleanShorthand = attributeValue === null;
  if (staticValue || isBooleanShorthand) {
    return staticValue;
  }

  const valueExpression = attributeValue.expression;
  // ternary
  if (valueExpression.type === 'ConditionalExpression') {
    return getExpressionValues(valueExpression);
  }
  // variable
  if (valueExpression.type === 'Identifier') {
    // This could be a variable defined within the component/file,
    // or it could be imported from elsewhere: we don't know. If needed in the future,
    // we could check to see if the variable is defined in this file, and therefore
    // check the value. However, as of Aug '21 there are only two instances of `display`
    // using a variable in Pinboard, and both are passed-in props, so we can't know
    // the values. For now we'll give variables the benefit of the doubt and treat them
    // as 'flex' so we don't throw unnecessary errors.
    return 'flex';
  }
  return undefined;
}

function getDangerouslySetStyles(attributeValue: {|
  expression: {|
    properties: $ReadOnlyArray<{
      key: {| name: string |},
      value: {
        properties: $ReadOnlyArray<{
          key: {| name: string |},
          value: { properties: $ReadOnlyArray<{ ... }>, ... },
          ...
        }>,
        ...
      },
      ...
    }>,
  |},
  // $FlowFixMe[unclear-type]
|}): any {
  const valueExpression = attributeValue.expression;
  const styleObject = valueExpression?.properties?.find(({ key }) => key.name === '__style');
  if (!styleObject) {
    return null;
  }
  return styleObject.value?.properties?.reduce(
    (acc, { key, value }) => ({
      ...acc,
      [key?.name]: value,
    }),
    {},
  );
}

function hasDangerouslySetFlexDisplay(
  stylesObject: null | {|
    display: {|
      value: string,
      consequent: {| value: string |},
      alternate: {| value: string |},
    |},
  |},
): boolean {
  if (!stylesObject || !stylesObject.display) {
    return false;
  }
  const displayValue = stylesObject.display.value ?? getExpressionValues(stylesObject.display);
  if (!displayValue) {
    return false;
  }
  return Array.isArray(displayValue)
    ? // $FlowFixMe[missing-local-annot]
      displayValue.some((value) => dangerousFlexGridDisplays.includes(value))
    : dangerousFlexGridDisplays.includes(displayValue);
}

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: `Don't allow useless props combinations on Box`,
      category: 'Gestalt restrictions',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltno-box-useless-props',
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
        localBoxName = decl.specifiers.find((node) => node.imported.name === 'Box')?.local?.name;
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
        const displayProps = props.filter(({ name }) =>
          displayPropNames.includes(getAttributeName(name)),
        );
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
