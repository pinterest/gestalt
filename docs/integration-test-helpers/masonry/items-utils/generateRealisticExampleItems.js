// @flow strict
import getRandomColor from './getRandomColor.js';
import getRandomNumberGenerator from './getRandomNumberGenerator.js';

let pinHeightsSampleIndex = 0;

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
  // const getRandomNumber = getRandomNumberGenerator(randomNumberSeed);
  // const color = getRandomColor(getRandomNumber);

  const pins = Array.from({ length: numberOfItems }).map((_, i) => ({
    name: `${name} ${i + previousItemCount}`,
    height: pinHeightsSample[pinHeightsSampleIndex + i],
    // color: getRandomColor(getRandomNumber),
    color: 'rebeccapurple',
  }));

  pinHeightsSampleIndex += numberOfItems;

  return pins;
}
