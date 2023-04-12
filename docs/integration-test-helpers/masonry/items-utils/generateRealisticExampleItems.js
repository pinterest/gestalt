// @flow strict
import getRandomColor from './getRandomColor.js';
import getRandomNumberGenerator from './getRandomNumberGenerator.js';

type Args = {|
  previousItemCount?: number,
  name?: string,
  randomNumberSeed?: number,
  numberOfItems?: number,
  pinHeightsSample: $ReadOnlyArray<number>,
|};

type ExampleItem = {|
  color: string,
  height: number,
  name: string,
|};

export default function generateRealisticExampleItems({
  previousItemCount = 0,
  name = 'Pin',
  randomNumberSeed = 0,
  numberOfItems = 20,
  pinHeightsSample,
}: Args): $ReadOnlyArray<ExampleItem> {
  const getRandomNumber = getRandomNumberGenerator(randomNumberSeed);
  const baseIndex = Math.ceil(randomNumberSeed * 10);

  const pins = Array.from({ length: numberOfItems }).map((_, i) => ({
    name: `${name} ${i + previousItemCount}`,
    height: pinHeightsSample[baseIndex + i],
    color: getRandomColor(getRandomNumber),
  }));

  return pins;
}
