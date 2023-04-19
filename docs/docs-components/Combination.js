// @flow strict
import { type Node } from 'react';
import { Box, Label, Text } from 'gestalt';
import Card from './Card.js';
import Checkerboard from './Checkerboard.js';

const combinations = (variationsByField: { heading?: boolean, ... }) => {
  const fieldNames = Object.keys(variationsByField);

  if (!fieldNames.length) return [{}];

  const combine = ([fieldName, ...restFieldNames]: $ReadOnlyArray<'heading'>, acc: { ... }) => {
    const variationsForField = variationsByField[fieldName];

    if (!Array.isArray(variationsForField) || !variationsForField.length) {
      throw new Error(`Please provide a non-empty array of possible values for prop ${fieldName}`);
    }

    const vs = variationsForField.map((fieldValue) => ({
      ...acc,
      [fieldName]: fieldValue,
    }));

    if (!restFieldNames.length) {
      return vs;
    }
    return vs.flatMap((newAcc) => combine(restFieldNames, newAcc));
  };

  return combine(fieldNames, {});
};

// $FlowFixMe[unclear-type]
const toReactAttribute = (key: string, value: any) => {
  switch (typeof value) {
    case 'boolean':
      return value && key;
    case 'string':
      return `${key}=${JSON.stringify(value)}`;
    default:
      try {
        return `${key}={${JSON.stringify(value)}}`;
      } catch (err) {
        // Handle React components and other circular objects gracefully
        return null;
      }
  }
};

function layoutReducer(layout: string) {
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

type Props = {
  // $FlowFixMe[unclear-type]
  children: (Object, number) => Node,
  description?: string,
  hasCheckerboard?: boolean,
  heading?: boolean,
  id?: string,
  labelPrefix?: string,
  layout?: '2column' | '4column' | '12column',
  name?: string,
  showHeading?: boolean,
  showValues?: boolean,
  stacked?: boolean,
  ...
};

export default function Combination({
  children,
  description = '',
  hasCheckerboard = true,
  id,
  labelPrefix,
  layout = '2column',
  name = 'Combinations',
  showHeading,
  showValues = true,
  stacked = false,
  ...props
}: Props): Node {
  const { column, mdColumn, lgColumn } = layoutReducer(layout);

  return (
    <Card name={name} description={description} id={id} stacked={stacked} showHeading={showHeading}>
      <Box display="flex" wrap>
        {combinations(props).map((combination, i) => {
          const combinationTitles = Object.keys(combination).map((key) => (
            <Text align="center" size="200" key={key}>
              {toReactAttribute(key, combination[key])}
            </Text>
          ));
          return (
            <Box
              column={column}
              mdColumn={mdColumn}
              lgColumn={lgColumn}
              key={JSON.stringify(combination)}
              padding={4}
              display="flex"
              direction="column"
              alignItems="center"
            >
              {showValues && (
                <Box color="default" marginBottom={2}>
                  {labelPrefix ? (
                    <Label htmlFor={`${labelPrefix}-${i}`}>{combinationTitles}</Label>
                  ) : (
                    combinationTitles
                  )}
                </Box>
              )}
              <Box position="relative" padding={4}>
                <Box position="absolute" top left bottom right>
                  {hasCheckerboard && <Checkerboard />}
                </Box>
                <Box position="relative">{children(combination, i)}</Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}
