// @flow strict

export const getRandomColor = (getRandomNumber?: () => number = Math.random): string => {
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

type generateExampleItemProps = {
  name?: string,
  total?: number,
  from?: number,
  baseHeight?: number,
  randomNumberSeed?: number,
  ...
};

type ExampleItem = {
  name: string,
  height: number,
  color: string,
  ...
};

export const generateExampleItems = ({
  name = 'Pin',
  total = 20,
  from = 0,
  baseHeight = 200,
  randomNumberSeed = 0,
}: generateExampleItemProps): $ReadOnlyArray<ExampleItem> => {
  const getRandomNumber = getRandomNumberGenerator(randomNumberSeed);
  return Array.from({ length: total }).map((_, i) => ({
    name: `${name} ${i + from}`,
    height: baseHeight + from + i,
    color: getRandomColor(getRandomNumber),
  }));
};
