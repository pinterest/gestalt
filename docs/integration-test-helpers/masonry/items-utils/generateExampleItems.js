// @flow strict
import getRandomColor from './getRandomColor';
import getRandomNumberGenerator from './getRandomNumberGenerator';

type Args = {
  baseHeight?: number,
  name?: string,
  numberOfItems?: number,
  previousItemCount?: number,
  randomNumberSeed?: number,
  twoColItems?: boolean,
};

type ExampleItem = {
  color: string,
  columnSpan?: number,
  height: number,
  name: string,
};

export default function generateExampleItems({
  baseHeight = 200,
  name = 'Pin',
  numberOfItems = 20,
  previousItemCount = 0,
  randomNumberSeed = 0,
  twoColItems,
}: Args): $ReadOnlyArray<ExampleItem> {
  const getRandomNumber = getRandomNumberGenerator(randomNumberSeed);
  const twoColItemIndex = twoColItems ? Math.floor(getRandomNumber() * numberOfItems) : undefined;

  return Array.from({ length: numberOfItems }).map((_, i) => {
    const pin = {
      name: `${name} ${i + previousItemCount}`,
      height: baseHeight + previousItemCount + i,
      color: getRandomColor(getRandomNumber),
    };
    return twoColItemIndex !== undefined && i === twoColItemIndex
      ? {
          ...pin,
          columnSpan: 2,
        }
      : pin;
  });
}
