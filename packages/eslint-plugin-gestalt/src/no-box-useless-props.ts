/**
 * @fileoverview Error on useless props on `Box`
 */

import { type ESLintRule } from './helpers/eslintFlowTypes';

export const errorMessages = {
  fit: '`fit` sets `maxWidth`, so `maxWidth` should not be specified when `fit` is used',
  flex: '`direction`, `smDirection`, `mdDirection`, `lgDirection`, and `wrap` must be used with `display="flex", or dangerously set display of "inline-flex", "inline-grid", or "grid"`',
} as const;

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

// @ts-expect-error - TS7006 - Parameter 'attributeName' implicitly has an 'any' type.
function getAttributeName(attributeName): string | null | undefined {
  return attributeName?.name;
}

function getExpressionValues(valueExpression: {
  value: string;
  consequent: {
    value: string;
  };
  alternate: {
    value: string;
  };
}): ReadonlyArray<string> {
  return [valueExpression.consequent, valueExpression.alternate].map((option) => option.value);
}

// @ts-expect-error - TS7006 - Parameter 'attributeValue' implicitly has an 'any' type.
function getAttributeValue(attributeValue): string | ReadonlyArray<string> | null | undefined {
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

function getDangerouslySetStyles(attributeValue: {
  expression: {
    properties: ReadonlyArray<{
      key: {
        name: string;
      };
      value: {
        properties: ReadonlyArray<{
          key: {
            name: string;
          };
          value: {
            properties: ReadonlyArray<Record<any, any>>;
          };
        }>;
      };
    }>;
  };
}): any {
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
  stylesObject: null | {
    display: {
      value: string;
      consequent: {
        value: string;
      };
      alternate: {
        value: string;
      };
    };
  },
): boolean {
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
      // @ts-expect-error - TS7006 - Parameter 'decl' implicitly has an 'any' type.
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
        localBoxName = decl.specifiers.find((node) => node.imported.name === 'Box')?.local?.name;
      },

      // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
      JSXOpeningElement(node) {
        if (!localBoxName || node?.name?.name !== localBoxName) {
          return;
        }

        // @ts-expect-error - TS7031 - Binding element 'name' implicitly has an 'any' type. | TS7031 - Binding element 'value' implicitly has an 'any' type.
        const props = node.attributes.map(({ name, value }) => ({
          name,
          value,
        }));
        // @ts-expect-error - TS7031 - Binding element 'name' implicitly has an 'any' type.
        const propNames = props.map(({ name }) => getAttributeName(name));

        // FIT - MAX WIDTH
        const hasFit = propNames.includes('fit');
        const hasMaxWidth = propNames.includes('maxWidth');

        if (hasFit && hasMaxWidth) {
          context.report(node, errorMessages.fit);
        }

        // FLEX PROPS
        // @ts-expect-error - TS7031 - Binding element 'name' implicitly has an 'any' type.
        const displayProps = props.filter(({ name }) =>
          // @ts-expect-error - TS2345 - Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'.
          displayPropNames.includes(getAttributeName(name)),
        );
        // @ts-expect-error - TS7031 - Binding element 'value' implicitly has an 'any' type.
        const isFlexDisplay = displayProps.some(({ value }) => {
          const propValue = getAttributeValue(value);
          return Array.isArray(propValue) ? propValue.includes('flex') : propValue === 'flex';
        });

        const dangerouslySetInlineStyleProp = props.find(
          // @ts-expect-error - TS7031 - Binding element 'name' implicitly has an 'any' type.
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
