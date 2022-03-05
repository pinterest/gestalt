import buildCustomApplyTransform from './utils.js';

jest.mock('../throwErrorMessage', () =>
  Object.assign(jest.requireActual('../throwErrorMessage'), {
    parser: 'flow',
  }),
);

const buildErrorMessage = ({
  test,
  lines,
}) => `This file requires manual attention. Follow the PR's instructions in the following code locations
${lines
  .map(
    (line) =>
      `Location: /Users/acarreras/code/gestalt/packages/gestalt-codemods/generic-codemods/__testfixtures__/${test}.input.js @line: ${line}`,
  )
  .join('\n')}`;

describe('throwErrorMessage: component', () => {
  ['throwErrorMessage/component', 'throwErrorMessage/componentAlias'].forEach((test) => {
    it(`throws error message correctly using "${test}" data`, () => {
      expect(
        buildCustomApplyTransform({
          transformName: 'throwErrorMessage',
          moduleOptions: {
            quote: 'single',
            component: 'Box',
          },
          test,
        }),
      ).toThrow(new Error(buildErrorMessage({ test, lines: [5, 6, 7] })));
    });
  });
});

describe('throwErrorMessage: subcomponent', () => {
  ['throwErrorMessage/subcomponent'].forEach((test) => {
    it(`throws error message correctly using "${test}" data`, () => {
      expect(
        buildCustomApplyTransform({
          transformName: 'throwErrorMessage',
          moduleOptions: {
            quote: 'single',
            component: 'Dropdown',
            subcomponent: 'Item',
          },
          test,
        }),
      ).toThrow(new Error(buildErrorMessage({ test, lines: [5, 6, 7] })));
    });
  });
});

describe('throwErrorMessage: spread props', () => {
  ['throwErrorMessage/spreadProps'].forEach((test) => {
    it(`throws error message correctly using "${test}" data`, () => {
      expect(
        buildCustomApplyTransform({
          transformName: 'throwErrorMessage',
          moduleOptions: {
            quote: 'single',
            component: 'Box',
            prop: 'color',
          },
          test,
        }),
      ).toThrow(
        new Error(`Remove dynamic properties and rerun codemod.
Location: /Users/acarreras/code/gestalt/packages/gestalt-codemods/generic-codemods/__testfixtures__/${test}.input.js @line: 6`),
      );
    });
  });
});

describe('throwErrorMessage: component + prop', () => {
  ['throwErrorMessage/componentProp'].forEach((test) => {
    it(`throws error message correctly using "${test}" data`, () => {
      expect(
        buildCustomApplyTransform({
          transformName: 'throwErrorMessage',
          moduleOptions: {
            quote: 'single',
            component: 'Box',
            prop: 'color',
          },
          test,
        }),
      ).toThrow(new Error(buildErrorMessage({ test, lines: [5, 6, 6] })));
    });
  });
});

describe('throwErrorMessage: component + prop + value', () => {
  ['throwErrorMessage/componentPropValue'].forEach((test) => {
    it(`throws error message correctly using "${test}" data`, () => {
      expect(
        buildCustomApplyTransform({
          transformName: 'throwErrorMessage',
          moduleOptions: {
            quote: 'single',
            component: 'Box',
            prop: 'color',
            value: 'red',
          },
          test,
        }),
      ).toThrow(new Error(buildErrorMessage({ test, lines: [5, 6, 7, 6, 7, 7] })));
    });
  });
});
