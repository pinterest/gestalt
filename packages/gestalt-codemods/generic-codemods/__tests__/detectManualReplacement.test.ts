import buildCustomApplyTransform, {
  buildInputPath,
  buildManualAttentionErrorMessage,
} from './utils';

jest.mock('../detectManualReplacement', () =>
  Object.assign(jest.requireActual('../detectManualReplacement'), {
    parser: 'flow',
  }),
);

describe('detectManualReplacement: component', () => {
  ['detectManualReplacement/component', 'detectManualReplacement/componentAlias'].forEach(
    (test) => {
      it(`throws error message correctly using "${test}" data`, () => {
        expect(
          buildCustomApplyTransform({
            transformName: 'detectManualReplacement',
            moduleOptions: {
              quote: 'single',
              component: 'Box',
            },
            test,
          }),
        ).toThrow(new Error(buildManualAttentionErrorMessage({ test, lines: [7, 8, 9] })));
      });
    },
  );
});

describe('detectManualReplacement: subcomponent', () => {
  ['detectManualReplacement/subcomponent'].forEach((test) => {
    it(`throws error message correctly using "${test}" data`, () => {
      expect(
        buildCustomApplyTransform({
          transformName: 'detectManualReplacement',
          moduleOptions: {
            quote: 'single',
            component: 'Dropdown',
            subcomponent: 'Item',
          },
          test,
        }),
      ).toThrow(new Error(buildManualAttentionErrorMessage({ test, lines: [7, 8, 9] })));
    });
  });
});

describe('detectManualReplacement: spread props', () => {
  ['detectManualReplacement/spreadProps'].forEach((test) => {
    it(`throws error message correctly using "${test}" data`, () => {
      expect(
        buildCustomApplyTransform({
          transformName: 'detectManualReplacement',
          moduleOptions: {
            quote: 'single',
            component: 'Box',
            prop: 'color',
          },
          test,
        }),
      ).toThrow(
        new Error(`Remove dynamic properties and rerun codemod.
Location: ${buildInputPath({ test })} @line: 8`),
      );
    });
  });
});

describe('detectManualReplacement: component + prop', () => {
  ['detectManualReplacement/componentProp'].forEach((test) => {
    it(`throws error message correctly using "${test}" data`, () => {
      expect(
        buildCustomApplyTransform({
          transformName: 'detectManualReplacement',
          moduleOptions: {
            quote: 'single',
            component: 'Box',
            prop: 'color',
          },
          test,
        }),
      ).toThrow(new Error(buildManualAttentionErrorMessage({ test, lines: [7, 8, 8] })));
    });
  });
});

describe('detectManualReplacement: component + prop + value', () => {
  ['detectManualReplacement/componentPropValue'].forEach((test) => {
    it(`throws error message correctly using "${test}" data`, () => {
      expect(
        buildCustomApplyTransform({
          transformName: 'detectManualReplacement',
          moduleOptions: {
            quote: 'single',
            component: 'Dropdown',
            subcomponent: 'Item',
            prop: 'color',
            value: 'red',
          },
          test,
        }),
      ).toThrow(
        new Error(
          buildManualAttentionErrorMessage({
            test,
            lines: [7, 9, 9, 9],
          }),
        ),
      );
    });
  });
});
