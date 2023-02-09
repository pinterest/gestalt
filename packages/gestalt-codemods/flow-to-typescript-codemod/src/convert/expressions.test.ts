import dedent from "dedent";
import { JEST_MOCK_METHODS } from "./utils/common";
import {
  transform,
  expectMigrationReporterMethodCalled,
  stateBuilder,
} from "./utils/testing";

jest.mock("../runner/migration-reporter/migration-reporter.ts");

describe("transform expressions", () => {
  it("converts basic typecast", async () => {
    const src = `(x: boolean);`;
    const expected = `(x as boolean);`;
    expect(await transform(src)).toBe(expected);
  });

  it("typecasts nested cast any", async () => {
    const src = `((x: any): T);`;
    const expected = `(x as T);`;
    expect(await transform(src)).toBe(expected);
  });

  it("typecasts nested cast object", async () => {
    const src = `((x: Object): T);`;
    const expected = dedent`
    (x as any as T);`;
    expect(await transform(src)).toBe(expected);
    expectMigrationReporterMethodCalled("usedFlowAnyObject");
  });

  it("typecasts nested cast function", async () => {
    const src = `((x: Function): T);`;
    const expected = dedent`
    (x as any as T);`;
    expect(await transform(src)).toBe(expected);
    expectMigrationReporterMethodCalled("usedFlowAnyFunction");
  });

  it("typecasts string constant", async () => {
    const src = `('foo': 'foo');`;
    const expected = `('foo' as const);`;
    expect(await transform(src)).toBe(expected);
  });

  it("typecasts number constant", async () => {
    const src = `(42: 42);`;
    const expected = `(42 as const);`;
    expect(await transform(src)).toBe(expected);
  });

  // Arrow Function Type Parameters
  it("does not modify non-tsx arrow function parameters", async () => {
    const src = `const f = <T>(arg: T) => {arg};`;
    expect(await transform(src)).toBe(src);
  });

  it("adds extends to ambiguous type parameters that could be JSX", async () => {
    const src = dedent`
    const f = <T>(arg: T) => {arg};
    const Component = <div />;
    `;
    const expected = dedent`
    const f = <T extends unknown>(arg: T) => {arg};
    const Component = <div />;
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("adds extends to ambiguous type params when were forcing TSX parsing", async () => {
    const src = dedent`
    const test = <T>(value: T): TestType<T> => ({
      foo: 'bar'
    });
    `;
    const expected = dedent`
    const test = <T extends unknown>(value: T): TestType<T> => ({
      foo: 'bar'
    });`;
    expect(
      await transform(src, stateBuilder({ config: { forceTSX: true } }))
    ).toBe(expected);
  });

  it("does not add extends to ambiguous type params when no JSX present and not forcing TSX", async () => {
    const src = dedent`
    const test = <T>(value: T): TestType<T> => ({
      foo: 'bar'
    });
    `;
    expect(
      await transform(src, stateBuilder({ config: { forceTSX: false } }))
    ).toBe(src);
  });

  it("adds extends to multiple ambiguous type parameters that could be JSX", async () => {
    const src = dedent`
    const f = <T, T2>(arg: T, arg2: T2) => {arg, arg2};
    const Component = <div />;
    `;
    const expected = dedent`
    const f = <T extends unknown, T2 extends unknown>(arg: T, arg2: T2) => {arg, arg2};
    const Component = <div />;
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("does not add extends if the type parameter already extends and it could be JSX", async () => {
    const src = dedent`
    const f = <T: string, T2>(arg: T, arg2: T2) => {arg, arg2};
    const Component = <div />;
    `;
    const expected = dedent`
    const f = <T extends string, T2 extends unknown>(arg: T, arg2: T2) => {arg, arg2};
    const Component = <div />;
    `;
    expect(await transform(src)).toBe(expected);
  });

  describe("new expressions with exact object types", () => {
    it("should remove the exact object types from type annotations", async () => {
      const src = dedent`
      // @flow
      const a: Array<{|
        foo: 'bar'
      |}> = new Array(0);`;
      const expected = dedent`
      const a: Array<{
        foo: 'bar'
      }> = new Array(0);`;
      expect(await transform(src)).toBe(expected);
    });

    it("should remove the exact object types from type arguments", async () => {
      const src = dedent`
      // @flow
      const test = () => {
        return class extends React.Component<{||}, {|bar: string|}> {};
      };`;
      const expected = dedent`
      const test = () => {
        return class extends React.Component<Record<any, any>, {
          bar: string
        }> {};
      };`;
      expect(await transform(src)).toBe(expected);
    });

    it("should not change if there are no exact bars", async () => {
      const expected = dedent`
      const a: Array<{
        foo: 'bar'
      }> = new Array(0);`;
      expect(await transform(expected)).toBe(expected);
    });

    it("should remove the exact object types from constructed objects", async () => {
      const src = dedent`// @flow
      const a = new Array<{|
        foo: 'bar'
      |}>();`;
      const expected = dedent`
      const a = new Array<{
        foo: 'bar'
      }>();`;
      expect(await transform(src)).toBe(expected);
    });
  });

  describe("untyped reduce MemberExpression", () => {
    it("should do nothing if there is a simple primitive value", async () => {
      const rootSrc = dedent`const a = [1, 2, 3].reduce((acc, val) => acc + val, 0);`;
      const src = dedent`
      // @flow
      ${rootSrc}`;
      expect(await transform(src)).toBe(rootSrc);
    });

    it("should do nothing if there is a type annotation on reduce", async () => {
      const rootSrc = `const a = [1, 2, 3].reduce<number[]>((acc, val) => [...acc, val], []);`;
      const src = dedent`
      // @flow
      ${rootSrc}`;
      expect(await transform(src)).toBe(rootSrc);
    });

    it("should do nothing it there is a type annotation on the accumulator", async () => {
      const src = dedent`
      // @flow
      const a = [1, 2, 3].reduce((acc: number[], val) => [...acc, val], ([]: number[]));`;

      const expected = dedent`
      const a = [1, 2, 3].reduce((acc: number[], val) => [...acc, val], ([] as number[]));`;
      expect(await transform(src)).toBe(expected);
    });

    it("should add an Array<any> type if accumulator is an array", async () => {
      const src = dedent`
      // @flow
      const a = [1, 2, 3].reduce((acc: number[], val) => [...acc, val], []);`;

      const expected = dedent`
      const a = [1, 2, 3].reduce<Array<any>>((acc: number[], val) => [...acc, val], []);`;
      expect(await transform(src)).toBe(expected);
    });

    it("should add a Record<string, any> type if accumulator is an object", async () => {
      const src = dedent`
      // @flow
      const a = [1, 2, 3].reduce((acc: any, val) => ({...acc, [val]: val}), {});`;

      const expected = dedent`
      const a = [1, 2, 3].reduce<Record<string, any>>((acc: any, val) => ({...acc, [val]: val}), {});`;
      expect(await transform(src)).toBe(expected);
    });
  });

  describe.each(JEST_MOCK_METHODS)("jest.%s paths", (mockMethod) => {
    it("should do nothing if there is no extension already", async () => {
      const src = dedent`jest.${mockMethod}('foo');`;
      expect(await transform(src)).toBe(src);
    });

    it("should remove the extension if a js or jsx one is provided", async () => {
      const src = dedent`
      jest.${mockMethod}('foo.js');
      jest.${mockMethod}('foo2.jsx');`;

      const expected = dedent`
      jest.${mockMethod}('foo');
      jest.${mockMethod}('foo2');`;
      expect(await transform(src)).toBe(expected);
    });

    it("should keep the extension if a non-js extension is provided", async () => {
      const src = dedent`
      jest.${mockMethod}('foo.ts');
      jest.${mockMethod}('foo2.tsx');`;

      expect(await transform(src)).toBe(src);
    });
  });
});
