import getRandomColor from './getRandomColor';
import getRandomNumberGenerator from './getRandomNumberGenerator';

type Args = {
  name?: string;
};

type ExampleItem = {
  color: string;
  columnSpan?: number;
  height: number;
  name: string;
};

export default function generateMultiColumnExampleItems({
  name = 'Pin',
}: Args): ReadonlyArray<ExampleItem> {
  const getRandomNumber = getRandomNumberGenerator(4);

  const pin1 = {
    name: `${name} ${1}`,
    height: 600,
    color: getRandomColor(getRandomNumber),
  } as const;

  const pin2 = {
    name: `${name} ${2}`,
    height: 300,
    color: getRandomColor(getRandomNumber),
  } as const;

  const pin3 = {
    name: `${name} ${3}`,
    height: 60,
    color: getRandomColor(getRandomNumber),
  } as const;

  const pin4 = {
    name: `${name} ${4}`,
    height: 360,
    color: getRandomColor(getRandomNumber),
  } as const;

  const pin5 = {
    name: `${name} ${5}`,
    height: 300,
    color: getRandomColor(getRandomNumber),
    columnSpan: 3,
  } as const;

  return [pin1, pin2, pin3, pin4, pin5]
}
