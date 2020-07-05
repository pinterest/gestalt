// @flow strict
import * as React from 'react';
import { Box, Text } from 'gestalt';
import Checkerboard from './Checkerboard.js';
import Card from './Card.js';

type Props = {|
  children: (Object, number) => React.Node,
  description?: string,
  heading?: boolean,
  id?: string,
  layout?: '2column' | '4column' | '12column',
  name?: string,
  showValues?: boolean,
  stacked?: boolean,
|};

const flatMap = (arr, fn) => arr.map(fn).reduce((a, b) => a.concat(b));
const combinations = variationsByField => {
  const fieldNames = Object.keys(variationsByField);

  if (!fieldNames.length) return [{}];

  const combine = ([fieldName, ...restFieldNames], acc) => {
    const variationsForField = variationsByField[fieldName];

    if (!Array.isArray(variationsForField) || !variationsForField.length) {
      throw new Error(
        `Please provide a non-empty array of possible values for prop ${fieldName}`
      );
    }

    const vs = variationsForField.map(fieldValue => ({
      ...acc,
      [fieldName]: fieldValue,
    }));

    if (!restFieldNames.length) {
      return vs;
    }
    return flatMap(vs, newAcc => combine(restFieldNames, newAcc));
  };

  return combine(fieldNames, {});
};

const toReactAttribute = (key, value) => {
  switch (typeof value) {
    case 'boolean':
      return value && key;
    case 'string':
      return `${key}=${JSON.stringify(value)}`;
    default:
      return `${key}={${JSON.stringify(value)}}`;
  }
};

function layoutReducer(layout) {
  switch (layout) {
    case '2column':
      return {
        column: 6,
        mdColumn: 3,
        lgColumn: 2,
      };
    case '4column':
      return {
        column: 12,
        mdColumn: 6,
        lgColumn: 4,
      };
    case '12column':
      return {
        column: 12,
        mdColumn: 12,
        lgColumn: 12,
      };
    default:
      throw new Error(`Layout ${layout} not implemented`);
  }
}

export default function Combination({
  name = '',
  description = '',
  layout = '2column',
  id,
  showValues = true,
  stacked = false,
  heading = true,
  children,
  ...props
}: Props) {
  const { column, mdColumn, lgColumn } = layoutReducer(layout);
  return (
    <Card
      name={name}
      description={description}
      id={id}
      stacked={stacked}
      heading={heading}
    >
      <Box display="flex" wrap>
        {combinations(props).map((combination, i) => (
          <Box
            column={column}
            mdColumn={mdColumn}
            lgColumn={lgColumn}
            key={i}
            padding={4}
            display="flex"
            direction="column"
            alignItems="center"
          >
            {showValues && (
              <Box marginBottom={2}>
                {Object.keys(combination).map(key => (
                  <Text align="center" size="md" key={`${i}-${key}`}>
                    {toReactAttribute(key, combination[key])}
                  </Text>
                ))}
              </Box>
            )}
            <Box position="relative" padding={4}>
              <Box position="absolute" top left bottom right>
                <Checkerboard />
              </Box>
              <Box position="relative">{children(combination, i)}</Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
