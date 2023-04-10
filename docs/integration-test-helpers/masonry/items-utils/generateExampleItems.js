// @flow strict
import getRandomColor from './getRandomColor.js';
import getRandomNumberGenerator from './getRandomNumberGenerator.js';

type Args = {|
  baseHeight?: number,
  from?: number,
  name?: string,
  randomNumberSeed?: number,
  total?: number,
|};

type ExampleItem = {|
  name: string,
  height: number,
  color: string,
|};

export default function generateExampleItems({
  baseHeight = 200,
  from = 0,
  name = 'Pin',
  randomNumberSeed = 0,
  total = 20,
}: Args): $ReadOnlyArray<ExampleItem> {
  const getRandomNumber = getRandomNumberGenerator(randomNumberSeed);

  return Array.from({ length: total }).map((_, i) => ({
    name: `${name} ${i + from}`,
    height: baseHeight + from + i,
    color: getRandomColor(getRandomNumber),
  }));
}
