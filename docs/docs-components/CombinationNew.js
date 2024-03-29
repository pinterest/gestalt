// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex } from 'gestalt';
import { useAppContext } from './appContext';
import Checkerboard from './Checkerboard';
import MainSectionCard from './MainSectionCard';

const combinations = (variationsByField: { ... }) => {
  const fieldNames = Object.keys(variationsByField);

  if (!fieldNames.length) return [{}];

  const combine = (
    [fieldName, ...restFieldNames]: $ReadOnlyArray<empty>,
    acc: { ... },
  ): $ReadOnlyArray<{}> => {
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
  children: (props: { [key: string]: any, ... }, index?: number) => ReactNode,
  hideTitle?: boolean,
  hasCheckerboard?: boolean,
  cardSize?: 'xs',
  ...
};

export default function CombinationNew({
  children,
  hideTitle,
  hasCheckerboard,
  cardSize,
  ...props
}: Props): ReactNode {
  const { helixBot } = useAppContext();

  const CardArray = combinations(props).map((combination, i) => {
    const combinationTitles = Object.keys(combination).map((key) =>
      toReactAttribute(key, combination[key]),
    );

    let cardShadeColor;

    if (
      combinationTitles.some(
        (title) =>
          title.includes('white') || title.includes('inverse') || title.includes('default'),
      )
    ) {
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
        cardSize={cardSize || 'sm'}
        shadeColor={cardShadeColor}
        title={hideTitle ? undefined : combinationTitles}
      >
        <Box bottom left position="absolute" right top>
          {hasCheckerboard && <Checkerboard />}
        </Box>
        {children(combination, i)}
      </MainSectionCard>
    );
  });

  if (helixBot) return null;

  return (
    <Flex gap={4} wrap>
      {CardArray}
    </Flex>
  );
}
