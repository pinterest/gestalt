import { stringTypeAnnotation } from "@babel/types";
import dedent from "dedent";
import { flowTypeAtPos } from "./flow/type-at-pos";
import {
  expectMigrationReporterMethodCalled,
  expectMigrationReporterMethodNotCalled,
  MockedMigrationReporter,
  stateBuilder,
  transform,
} from "./utils/testing";

jest.mock("../runner/migration-reporter/migration-reporter.ts");

jest.mock("./flow/type-at-pos");
const mockedFlowTypeAtPos = <jest.MockedFunction<typeof flowTypeAtPos>>(
  flowTypeAtPos
);

describe("parameter inference", () => {
  afterEach(mockedFlowTypeAtPos.mockReset);
  describe("required inference", () => {
    it("provides inference for ArrowFunctionExpressions", async () => {
      const src = `(a, b) => {a + b};`;
      const expected = `(a: string, b: string) => {a + b};`;
      mockedFlowTypeAtPos.mockResolvedValue(stringTypeAnnotation());
      expect(await transform(src)).toBe(expected);
    });

    it("skips inference if disableFlow is set", async () => {
      const src = `(a, b) => {a + b};`;
      const expected = `(a: unknown, b: unknown) => {a + b};`;
      // mockedFlowTypeAtPos.mockResolvedValue(stringTypeAnnotation());
      expect(
        await transform(src, stateBuilder({ config: { disableFlow: true } }))
      ).toBe(expected);
    });

    it("provides inference for FunctionDeclarations", async () => {
      const src = `function fn(a, b) {return a + b};`;
      const expected = `function fn(a: string, b: string) {return a + b};`;
      mockedFlowTypeAtPos.mockResolvedValue(stringTypeAnnotation());
      expect(await transform(src)).toBe(expected);
    });

    it("provides inference for FunctionExpressions", async () => {
      const src = `const fn = function(a, b) {return a + b};`;
      const expected = `const fn = function(a: string, b: string) {return a + b};`;
      mockedFlowTypeAtPos.mockResolvedValue(stringTypeAnnotation());
      expect(await transform(src)).toBe(expected);
    });

    it("provides inference for ClassMethods", async () => {
      const src = dedent`class MyClass {
        method(value): void {}
      }`;
      const expected = dedent`class MyClass {
        method(value: string): void {}
      }`;
      mockedFlowTypeAtPos.mockResolvedValue(stringTypeAnnotation());
      expect(await transform(src)).toBe(expected);
    });

    describe("test files", () => {
      it("uses `any` type instead of parameter inference for test files", async () => {
        const src = `(a, b) => {a + b};`;
        const expected = `(a: any, b: any) => {a + b};`;

        expect(
          await transform(
            src,
            stateBuilder({
              config: {
                filePath: "./fake/test.js",
                isTestFile: true,
                watermark: "@test",
                watermarkMessage: `Test message`,
              },
            })
          )
        ).toBe(expected);
        expect(mockedFlowTypeAtPos).not.toBeCalled();
      });
    });
  });

  describe("unnecessary inference", () => {
    it("does not provide inference on ArrowFunctionExpressions within CallExpressions", async () => {
      const src = `const r = [1, 2, 3].map(a => a + 1);`;
      const expected = `const r = [1, 2, 3].map(a => a + 1);`;
      expect(await transform(src)).toBe(expected);
      expect(mockedFlowTypeAtPos).not.toBeCalled();
    });
    it("does not provide inference on FunctionDeclarations within CallExpressions", async () => {
      const src = `const r = [1, 2, 3].map(function fn(a) {return a + 1});`;
      const expected = `const r = [1, 2, 3].map(function fn(a) {return a + 1});`;
      expect(await transform(src)).toBe(expected);
      expect(mockedFlowTypeAtPos).not.toBeCalled();
    });
  });
});

describe("async functions", () => {
  afterEach(MockedMigrationReporter.mockReset);

  it("does not affect correctly type async functions", async () => {
    const src = dedent`
    async function simpleFunction(): Promise<void> {}
    const simpleFunction2 = async (): Promise<void> => {};
    `;
    const expected = dedent`
    async function simpleFunction(): Promise<void> {}
    const simpleFunction2 = async (): Promise<void> => {};
    `;
    expect(await transform(src)).toBe(expected);
    expectMigrationReporterMethodNotCalled("asyncFunctionReturnType");
  });

  it("does transform arrow functions", async () => {
    const src = dedent`
    const simpleFunction = async (): Type => {};
    `;
    const expected = dedent`
    const simpleFunction = async (): Promise<Type> => {};
    `;
    expect(await transform(src)).toBe(expected);
    expectMigrationReporterMethodCalled("asyncFunctionReturnType");
  });

  it("does transform function declarations", async () => {
    const src = dedent`
    async function simpleFunction(): Type {}
    `;
    const expected = dedent`
    async function simpleFunction(): Promise<Type> {}
    `;
    expect(await transform(src)).toBe(expected);
    expectMigrationReporterMethodCalled("asyncFunctionReturnType");
  });

  it("keeps namespaces around", async () => {
    const src = dedent`
    async function simpleFunction(): Type<InnerType> {}
    `;
    const expected = dedent`
    async function simpleFunction(): Promise<Type<InnerType>> {}
    `;
    expect(await transform(src)).toBe(expected);
    expectMigrationReporterMethodCalled("asyncFunctionReturnType");
  });
});

describe("assigning required fields an optional value", () => {
  afterEach(MockedMigrationReporter.mockReset);

  it("does not affect basic functions", async () => {
    const src = dedent`
    async function simpleFunction(): Promise<void> {}
    `;

    await transform(src);

    expectMigrationReporterMethodNotCalled("requiredPropInOptionalAssignment");
  });

  it("warns when a value is marked as required but assigned to an empty object", async () => {
    const src = dedent`
    function a({blah = false}: {blah: boolean} = {}) {}
    `;

    await transform(src);

    expectMigrationReporterMethodCalled("requiredPropInOptionalAssignment");
  });

  it("does not warn the property is optional", async () => {
    const src = dedent`
    function a({blah = false}: {blah?: boolean} = {}) {}
    `;

    await transform(src);

    expectMigrationReporterMethodNotCalled("requiredPropInOptionalAssignment");
  });

  describe("arrow functions with object returns", () => {
    // const f1 = (): any => ({});
    it("should keep parentheses around arrow functions that return objects", async () => {
      const src = dedent`
    const f1 = (arg1: string): any => ({});
    const f2 = (arg1: string) => ({});
    const f3 = async (arg1: string): Promise<any> => ({});
    const f4 = <T>(arg1: T) => ({});
    const f5 = <T>(arg1: T): T => ({});
    const f6 = <T>(arg1: T): any => ({});
    class Cls1 { f4 = (arg1: string): any => ({}) }
    class Cls2 { f5 = async (arg1: string): Promise<object> => ({}) }
    class Cls3 { f6 = (arg1: string) => ({}) }
    const f7 = (arg1: string): () => Record<string, string> => () => ({});
    const f8 = (arg1: string): () => string => (): string => ({});
    const f9 = (arg1: string): any => ({foo: 'bar'});
    const f10 = (arg1: string): any => ({foo() {}});
    var f11 = {foo: (arg1: string): object => ({})}
    `;

      expect(await transform(src)).toBe(src);
    });
  });
});
