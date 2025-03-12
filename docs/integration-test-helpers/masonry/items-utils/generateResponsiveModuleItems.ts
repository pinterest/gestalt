import {
  ColumnSpanConfig,
  ResponsiveModuleConfig,
} from 'packages/gestalt/src/Masonry/multiColumnLayout';
import getRandomColor from './getRandomColor';
import getRandomNumberGenerator from './getRandomNumberGenerator';

type Args = {
  name?: string;
  insertIntermediateItem?: boolean;
  removeMulticolumnItem?: boolean;
};

type ExampleItem = {
  color: string;
  columnSpan?: ColumnSpanConfig;
  responsiveModuleConfig?: ResponsiveModuleConfig;
  height: number;
  name: string;
};

export default function generateResPonsiveModuleItems({
  name = 'Pin',
  insertIntermediateItem = false,
  removeMulticolumnItem = false,
}: Args): ReadonlyArray<ExampleItem> {
  const getRandomNumber = getRandomNumberGenerator(4);

  const pin0 = {
    name: `${name} ${0} - ModuleItem`,
    height: 500,
    color: '#ccc',
    itemType: 'moduleItem',
    columnSpan: { 'sm': 2, 'md': 2, '_lg1': 3, 'lg': 4, 'xl': 5 },
  } as const;
  const pin1 = {
    name: `${name} ${1} - ResponsiveModuleItem`,
    height: 200,
    color: '#eee',
    itemType: 'responsiveModuleItem',
    responsiveModuleConfig: {
      max: 7,
      min: 2,
    },
  } as const;
  const pin2 = {
    name: `${name} ${2}`,
    height: 200,
    color: getRandomColor(getRandomNumber),
    itemType: 'normalItem',
  } as const;

  if (insertIntermediateItem && removeMulticolumnItem) {
    return [pin2, pin1];
  }

  if (insertIntermediateItem) {
    return [pin0, pin2, pin1];
  }

  if (removeMulticolumnItem) {
    return [pin1];
  }

  return [pin0, pin1, pin2];
}
