// @flow strict
import getRandomColor from './getRandomColor.js';
import getRandomNumberGenerator from './getRandomNumberGenerator.js';
import pinHeights, { type PinHeight } from './pinHeights.js';

function randomSample(samples: $ReadOnlyArray<PinHeight>, field: 'impressionsCount' | 'pinsCount') {
  // [0..1) * sum of weight
  let sample = Math.random() * samples.reduce((sum, pin) => sum + pin[field], 0);

  // first sample n where sum of weight for [0..n] > sample
  // eslint-disable-next-line no-return-assign
  const { height } = samples.find((pin) => (sample -= pin[field]) < 0) ?? {};

  return height;
}

const pinHeightSample = Array.from({ length: 1000 }).map(() =>
  randomSample(pinHeights, 'pinsCount'),
);
let pinHeightSampleIndex = 0;
console.log(pinHeightSample);

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

  const pins = Array.from({ length: numberOfItems }).map((_, i) => ({
    name: `${name} ${i + previousItemCount}`,
    height: pinHeightSample[pinHeightSampleIndex + i],
    color: getRandomColor(getRandomNumber),
  }));

  pinHeightSampleIndex += numberOfItems;

  return pins;
}
