import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../convert-shape-to-rounding', () => Object.assign(jest.requireActual('../convert-shape-to-rounding'), {
    parser: 'flow',
  }));

describe('convert-shape-to-rounding', () => {
  [
    'convert-box-shape-to-rounding-circle',
    'convert-box-shape-to-rounding-pill',
    'convert-box-shape-to-rounding-rounded',
    'convert-box-shape-to-rounding-square',
    'convert-box-shape-to-rounding-ternary',
    'convert-mask-shape-to-rounding-circle',
    'convert-mask-shape-to-rounding-rounded',
    'convert-mask-shape-to-rounding-square',
    'convert-touchable-shape-to-rounding-expression-circle',
    'convert-touchable-shape-to-rounding-circle',
    'convert-touchable-shape-to-rounding-pill',
    'convert-touchable-shape-to-rounding-rounded',
    'convert-touchable-shape-to-rounding-square',
  ].forEach((test) => {
    defineTest(__dirname, 'convert-shape-to-rounding', { quote: 'single' }, test);
  });
});
