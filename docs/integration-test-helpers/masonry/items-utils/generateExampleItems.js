// @flow strict
import getRandomColor from './getRandomColor.js';
import getRandomNumberGenerator from './getRandomNumberGenerator.js';

type Args = {|
  baseHeight?: number,
  previousItemCount?: number,
  name?: string,
  randomNumberSeed?: number,
  numberOfItems?: number,
|};

type ExampleItem = {|
  name: string,
  height: number,
  color: string,
|};

export default function generateExampleItems({
  baseHeight = 200,
  previousItemCount = 0,
  name = 'Pin',
  randomNumberSeed = 0,
  numberOfItems = 20,
}: Args): $ReadOnlyArray<ExampleItem> {
  const getRandomNumber = getRandomNumberGenerator(randomNumberSeed);

  return Array.from({ length: numberOfItems }).map((_, i) => ({
    name: `${name} ${i + previousItemCount}`,
    height: baseHeight + previousItemCount + i,
    color: getRandomColor(getRandomNumber),
  }));
}
