import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../convert-box-roundedX', () => {
  return Object.assign(require.requireActual('../convert-box-roundedX'), {
    parser: 'flow',
  });
});

describe('convert-box-roundedX', () => {
  [
    'convert-box-roundedX-bottom',
    'convert-box-roundedX-left',
    'convert-box-roundedX-right',
    'convert-box-roundedX-top',
    'convert-box-roundedX-circle',
  ].forEach(test => {
    defineTest(__dirname, 'convert-box-roundedX', { quote: 'single' }, test);
  });
});
