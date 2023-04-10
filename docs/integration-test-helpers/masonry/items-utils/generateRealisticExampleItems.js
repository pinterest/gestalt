// @flow strict
import getRandomColor from './getRandomColor.js';
import getRandomNumberGenerator from './getRandomNumberGenerator.js';
import { pinHeightsByFrequency, pinHeightsByImpressions } from './pinHeights.js';

function randomSample(samples) {
  // [0..1) * sum of weight
  let sample = Math.random() * samples.reduce((sum, { weight }) => sum + weight, 0);

  // first sample n where sum of weight for [0..n] > sample
  // eslint-disable-next-line no-return-assign
  const { value } = samples.find(({ weight }) => (sample -= weight) < 0) ?? {};

  return value;
}

const pinHeightSample = Array.from({ length: 10000 }).map(() =>
  randomSample(pinHeightsByFrequency),
);
let pinHeightSampleIndex = 0;
console.log(pinHeightsByFrequency.reduce((sum, { weight }) => sum + weight, 0));

type Args = {|
  from?: number,
  name?: string,
  randomNumberSeed?: number,
  total?: number,
|};

type ExampleItem = {|
  color: string,
  height: number,
  name: string,
|};

export default function generateRealisticExampleItems({
  from = 0,
  name = 'Pin',
  randomNumberSeed = 0,
  total = 20,
}: Args): $ReadOnlyArray<ExampleItem> {
  const getRandomNumber = getRandomNumberGenerator(randomNumberSeed);

  const pins = Array.from({ length: total }).map((_, i) => ({
    name: `${name} ${i + from}`,
    height: pinHeightSample[pinHeightSampleIndex + i],
    color: getRandomColor(getRandomNumber),
  }));

  pinHeightSampleIndex += total;

  return pins;
}
