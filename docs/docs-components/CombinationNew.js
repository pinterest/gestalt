// @flow strict
import { type Node } from 'react';
import { Box, Flex } from 'gestalt';
import Checkerboard from './Checkerboard.js';
import MainSectionCard from './MainSectionCard.js';

const combinations = (variationsByField: { ... }) => {
  const fieldNames = Object.keys(variationsByField);

  if (!fieldNames.length) return [{}];

  const combine = (
    [fieldName, ...restFieldNames]: $ReadOnlyArray<empty>,
    acc: { ... },
  ): $ReadOnlyArray<{||}> => {
    const variationsForField = variationsByField[fieldName];

    if (!Array.isArray(variationsForField) || !variationsForField.length) {
      throw new Error(`Please provide a non-empty array of possible values for prop ${fieldName}`);
    }

    const vs = variationsForField.map((fieldValue: string) => ({
      ...acc,
      [fieldName]: fieldValue,
    }));

    if (!restFieldNames.length) {
      return vs;
    }
    return vs.flatMap((newAcc: { [string]: string }) => combine(restFieldNames, newAcc));
  };

  return combine(fieldNames, {});
};

// $FlowFixMe[unclear-type]
const toReactAttribute = (key: string, value: any) => {
  switch (typeof value) {
    case 'boolean':
      return (value && key).toString();
    case 'string':
      return `${key}=${JSON.stringify(value)}`;
    default:
      return `${key}={${JSON.stringify(value)}}`;
  }
};

type Props = {
  // $FlowFixMe[unclear-type]
  children: (props: { [key: string]: any, ... }, index?: number) => Node,
  hideTitle?: boolean,
  hasCheckerboard?: boolean,
  ...
};

export default function CombinationNew({
  children,
  hideTitle,
  hasCheckerboard,
  ...props
}: Props): Node {
  const CardArray = combinations(props).map((combination, i) => {
    const combinationTitles = Object.keys(combination).map((key) =>
      toReactAttribute(key, combination[key]),
    );

    let cardShadeColor;

    if (combinationTitles.some((title) => title.includes('white') || title.includes('inverse'))) {
      cardShadeColor = 'tertiary';
    }
    if (combinationTitles.some((title) => title.includes('"light"'))) {
      cardShadeColor = 'darkWash';
    }
    if (combinationTitles.some((title) => title.includes('"dark"'))) {
      cardShadeColor = 'lightWash';
    }

    return (
      <MainSectionCard
        key={JSON.stringify(combination)}
        cardSize="sm"
        shadeColor={cardShadeColor}
        title={hideTitle ? undefined : combinationTitles}
      >
        <Box position="absolute" top left bottom right>
          {hasCheckerboard && <Checkerboard />}
        </Box>
        {children(combination, i)}
      </MainSectionCard>
    );
  });
  return (
    <Flex
      wrap
      gap={{
        row: 4,
        column: 0,
      }}
    >
      {CardArray}
    </Flex>
  );
}
