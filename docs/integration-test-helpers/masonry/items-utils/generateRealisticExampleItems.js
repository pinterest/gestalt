// @flow strict
import getRandomColor from './getRandomColor.js';
import getRandomNumberGenerator from './getRandomNumberGenerator.js';
import pinHeightsSingleton from './pinHeightsSingleton.js';

console.log(pinHeightsSingleton.pinHeightSample);

type Args = {|
  previousItemCount?: number,
  name?: string,
  randomNumberSeed?: number,
  numberOfItems?: number,
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
}: Args): $ReadOnlyArray<ExampleItem> {
  const getRandomNumber = getRandomNumberGenerator(randomNumberSeed);
  const color = getRandomColor(getRandomNumber);

  const pins = Array.from({ length: numberOfItems }).map((_, i) => ({
    name: `${name} ${i + previousItemCount}`,
    height: pinHeightsSingleton.pinHeightSample[pinHeightsSingleton.pinHeightSampleIndex + i],
    // color: getRandomColor(getRandomNumber),
    color,
  }));
  console.log(pinHeightsSingleton.pinHeightSampleIndex);
  pinHeightsSingleton.pinHeightSampleIndex += numberOfItems;

  return pins;
}
