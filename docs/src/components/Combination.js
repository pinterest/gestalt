// @flow
import * as React from 'react';
import { Box, Text } from 'gestalt';
import Checkerboard from './Checkerboard.js';
import Card from './Card.js';

type Props = {
  children: (Object, number) => React.Node,
  description?: string,
  heading?: boolean,
  id?: string,
  name?: string,
  stacked?: boolean,
};

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

export default function Combination({
  name = '',
  description = '',
  id,
  stacked = false,
  heading = true,
  children,
  ...props
}: Props) {
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
            column={4}
            mdColumn={3}
            lgColumn={2}
            key={i}
            padding={4}
            display="flex"
            direction="column"
            alignItems="center"
          >
            <Box marginBottom={2}>
              {Object.keys(combination).map(key => (
                <Text align="center" size="sm" key={`${i}-${key}`}>
                  {toReactAttribute(key, combination[key])}
                </Text>
              ))}
            </Box>
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
