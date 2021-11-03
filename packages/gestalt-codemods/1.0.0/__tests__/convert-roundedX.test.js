import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../convert-roundedX', () =>
  Object.assign(jest.requireActual('../convert-roundedX'), {
    parser: 'flow',
  }),
);

describe('convert-roundedX', () => {
  [
    'convert-box-roundedX-bottom',
    'convert-box-roundedX-left',
    'convert-box-roundedX-right',
    'convert-box-roundedX-top',
    'convert-box-roundedX-circle',
    'convert-touchable-roundedX-bottom',
    'convert-touchable-roundedX-left',
    'convert-touchable-roundedX-right',
    'convert-touchable-roundedX-top',
    'convert-touchable-roundedX-circle',
  ].forEach((test) => {
    defineTest(__dirname, 'convert-roundedX', { quote: 'single' }, test);
  });
});
