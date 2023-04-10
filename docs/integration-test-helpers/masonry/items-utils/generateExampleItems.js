// @flow strict

const getRandomColor = (getRandomNumber?: () => number = Math.random): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(getRandomNumber() * 16)];
  }
  return color;
};

export const getRandomNumberGenerator = (seed: number): (() => number) => {
  let localSeed = seed;

  return () => {
    localSeed += 1;
    const rnd = Math.sin(localSeed);
    return rnd - Math.floor(rnd);
  };
};

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
