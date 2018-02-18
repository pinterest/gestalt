import React from 'react';
import Checkerboard from './Checkerboard';
import Box from '../../../src/Box/Box';
import Text from '../../../src/Text/Text';

const flatMap = (arr, fn) => arr.map(fn).reduce((a, b) => a.concat(b));
const combinations = variationsByField => {
  const fieldNames = Object.keys(variationsByField);

  if (!fieldNames.length) return [{}];

  const _combinations = ([fieldName, ...restFieldNames], acc) => {
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
    return flatMap(vs, newAcc => _combinations(restFieldNames, newAcc));
  };

  return _combinations(fieldNames, {});
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

export default ({ children, ...props }) => (
  <Box display="flex" overflow="scrollX">
    <table>
      <tbody>
        <tr>
          {combinations(props).map((combination, i) => (
            <td key={i}>
              <Box padding={2}>
                {Object.keys(combination).map(key => (
                  <Text align="center" size="sm" key={`${i}-${key}`}>
                    {toReactAttribute(key, combination[key])}
                  </Text>
                ))}
              </Box>
            </td>
          ))}
        </tr>
        <tr style={{ verticalAlign: 'top' }}>
          {combinations(props).map((combination, i) => (
            <td key={i}>
              <Box position="relative" padding={4}>
                <Box position="absolute" top left bottom right>
                  <Checkerboard />
                </Box>
                <Box position="relative">{children(combination, i)}</Box>
              </Box>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </Box>
);
