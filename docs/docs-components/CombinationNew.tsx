import { ReactNode } from 'react';
import { Box, Flex } from 'gestalt';
import { useAppContext } from './appContext';
import Checkerboard from './Checkerboard';
import MainSectionCard from './MainSectionCard';

const combinations = (variationsByField: Record<any, any>) => {
  const fieldNames = Object.keys(variationsByField);

  if (!fieldNames.length) return [{}];

  const combine = (
    [fieldName, ...restFieldNames]: [any, any],
    acc: Record<any, any>,
  ): ReadonlyArray<Record<any, any>> => {
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
    // @ts-expect-error - TS2345 - Argument of type '[any]' is not assignable to parameter of type '[any, any]'.
    return vs.flatMap((newAcc: { [key: string]: string }) => combine(restFieldNames, newAcc));
  };

  // @ts-expect-error - TS2345 - Argument of type 'string[]' is not assignable to parameter of type '[any, any]'.
  return combine(fieldNames, {});
};

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
  children: (
    props: {
      [key: string]: any;
    },
    index?: number,
  ) => ReactNode;
  hideTitle?: boolean;
  hasCheckerboard?: boolean;
  cardSize?: 'xs';
};

export default function CombinationNew({
  children,
  hideTitle,
  hasCheckerboard,
  cardSize,
  ...props
}: Props) {
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
    if (
      combinationTitles.some((title) => title.includes('"light"') || title.includes('"washLight"'))
    ) {
      cardShadeColor = 'transparentDarkGray';
    }
    if (
      combinationTitles.some(
        (title) => title.includes('"dark"') || title.includes('"transparentDarkGray"'),
      )
    ) {
      cardShadeColor = 'lightWash';
    }

    return (
      <MainSectionCard
        key={JSON.stringify(combination)}
        cardSize={cardSize || 'sm'}
        // @ts-expect-error - TS2322 - Type 'string | undefined' is not assignable to type '"default" | "darkWash" | "lightWash" | "tertiary" | undefined'.
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
