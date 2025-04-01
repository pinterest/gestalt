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

export default function generateFiexedTreeColumnExampleItems({
  name = 'Pin',
}: Args): ReadonlyArray<ExampleItem> {
  const getRandomNumber = getRandomNumberGenerator(6);

  return [
    // Frist Batch
    {
      name: `${name} ${0}`,
      height: 250,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${1}`,
      height: 150,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${2}`,
      height: 400,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${3}`,
      height: 200,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${4}`,
      height: 250,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${5}`,
      height: 250,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${6}`,
      height: 200,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${7}`,
      height: 400,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${8}`,
      height: 450,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${9}`,
      height: 150,
      color: getRandomColor(getRandomNumber),
      columnSpan: 3,
    },
    {
      name: `${name} ${10}`,
      height: 350,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${11}`,
      height: 400,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${12}`,
      height: 250,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${13}`,
      height: 315,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${14}`,
      height: 250,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${15}`,
      height: 300,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${16}`,
      height: 300,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${17}`,
      height: 450,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${18}`,
      height: 235,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${19}`,
      height: 250,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${20}`,
      height: 200,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    // Second Batch
    {
      name: `${name} ${21}`,
      height: 150,
      color: getRandomColor(getRandomNumber),
      columnSpan: 3,
    },
    {
      name: `${name} ${22}`,
      height: 350,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${23}`,
      height: 400,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${24}`,
      height: 500,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${25}`,
      height: 400,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${26}`,
      height: 250,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${27}`,
      height: 400,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${28}`,
      height: 500,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${29}`,
      height: 450,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${30}`,
      height: 400,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${31}`,
      height: 250,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${32}`,
      height: 400,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${33}`,
      height: 350,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${34}`,
      height: 450,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${35}`,
      height: 500,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${36}`,
      height: 500,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${37}`,
      height: 450,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${38}`,
      height: 300,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
    {
      name: `${name} ${39}`,
      height: 250,
      color: getRandomColor(getRandomNumber),
      columnSpan: 1,
    },
  ];
}
