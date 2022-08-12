// @flow strict
import { Flex } from 'gestalt';
import { type Node } from 'react';
import MainSectionCard from './MainSectionCard.js';

type Props = {
  // $FlowFixMe[unclear-type]
  children: (props: { [key: string]: any, ... }, index?: number) => Node,
  hideTitle?: boolean,
  ...
};

const flatMap = (arr, fn) => arr.map(fn).reduce((a, b) => a.concat(b));
const combinations = (variationsByField) => {
  const fieldNames = Object.keys(variationsByField);

  if (!fieldNames.length) return [{}];

  const combine = ([fieldName, ...restFieldNames], acc) => {
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
    return flatMap(vs, (newAcc) => combine(restFieldNames, newAcc));
  };

  return combine(fieldNames, {});
};

const toReactAttribute = (key, value) => {
  switch (typeof value) {
    case 'boolean':
      return (value && key).toString();
    case 'string':
      return `${key}=${JSON.stringify(value)}`;
    default:
      return `${key}={${JSON.stringify(value)}}`;
  }
};

export default function CombinationNew({ children, hideTitle, ...props }: Props): Node {
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
        key={i}
        cardSize="sm"
        shadeColor={cardShadeColor}
        title={hideTitle ? undefined : combinationTitles}
      >
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
