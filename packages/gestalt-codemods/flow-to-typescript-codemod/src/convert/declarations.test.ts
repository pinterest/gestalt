import * as t from "@babel/types";
import dedent from "dedent";
import {
  transform,
  stateBuilder,
  expectMigrationReporterMethodCalled,
  expectMigrationReporterMethodNotCalled,
} from "./utils/testing";
import { ReactTypes } from "./utils/type-mappings";
import { flowTypeAtPos } from "./flow/type-at-pos";

jest.mock("../runner/migration-reporter/migration-reporter.ts");
jest.mock("./flow/type-at-pos.ts");

const mockFlowTypeAtPos = flowTypeAtPos as unknown as jest.MockedFunction<
  typeof flowTypeAtPos
>;

describe("transform declarations", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("import declarations", () => {
    it("does not transforms type imports", async () => {
      const src = `import type {foo} from './foo';`;
      const expected = `import type {foo} from './foo';`;
      expect(await transform(src)).toBe(expected);
    });

    it("transforms typeof imports", async () => {
      const src = `import typeof {foo} from './foo';`;
      const expected = `import {foo} from './foo';`;
      expect(await transform(src)).toBe(expected);
    });
    it("transforms default typeof imports", async () => {
      const src = `import typeof Foo from './foo';`;
      const expected = `import Foo from './foo';`;
      expect(await transform(src)).toBe(expected);
    });

    it("transforms named type imports", async () => {
      const src = `import {type Foo} from './foo';`;
      const expected = `import {Foo} from './foo';`;
      expect(await transform(src)).toBe(expected);
    });

    it("does not transform type exports", async () => {
      const src = `export type {foo} from './foo';`;
      const expected = `export type {foo} from './foo';`;
      expect(await transform(src)).toBe(expected);
    });

    it("transforms type * exports", async () => {
      const src = `export type * from './foo';`;
      const expected = `export * from './foo';`;
      expect(await transform(src)).toBe(expected);
    });

    it("warns for js imports", async () => {
      const src = `import {foo} from './foo.js';`;
      expect(await transform(src)).toBe(src);
      expectMigrationReporterMethodCalled(`importWithExtension`);
    });

    it("warns for jsx imports", async () => {
      const src = `import {foo} from './foo.jsx';`;
      expect(await transform(src)).toBe(src);
      expectMigrationReporterMethodCalled(`importWithExtension`);
    });

    it("drops js imports when flag is present", async () => {
      const src = `import {foo} from './foo.js';`;
      const expected = `import {foo} from './foo';`;
      expect(
        await transform(
          src,
          stateBuilder({ config: { dropImportExtensions: true } })
        )
      ).toBe(expected);

      expectMigrationReporterMethodCalled(`importWithExtension`);
    });

    it("drops jsx imports when flag is present", async () => {
      const src = `import {foo} from './foo.jsx';`;
      const expected = `import {foo} from './foo';`;
      expect(
        await transform(
          src,
          stateBuilder({ config: { dropImportExtensions: true } })
        )
      ).toBe(expected);

      expectMigrationReporterMethodCalled(`importWithExtension`);
    });

    it("does not convert extensions similar to js imports when flag is present", async () => {
      const src = `import {foo} from './foo.json';`;
      expect(
        await transform(
          src,
          stateBuilder({ config: { dropImportExtensions: true } })
        )
      ).toBe(src);

      expectMigrationReporterMethodNotCalled(`importWithExtension`);
    });

    describe("Flow to TypeScript React import transformations", () => {
      Object.entries(ReactTypes).forEach(([flowType, tsType]) => {
        it(`transforms type imports of ${flowType} from react`, async () => {
          const src = `import type {${flowType}} from 'react';`;
          const expected = `import type {${tsType}} from 'react';`;
          expect(await transform(src)).toBe(expected);
        });

        it(`does not transform non-type imports of ${flowType} from react`, async () => {
          const src = `import React, {${flowType}} from 'react';`;
          expect(await transform(src)).toBe(src);
        });

        it(`does not transform non-type imports ${flowType} from react with multiple imports`, async () => {
          const src = `import {PureComponent, ${flowType}} from 'react';`;
          expect(await transform(src)).toBe(src);
        });

        it(`transforms type imports of ${flowType} from react with multiple imports`, async () => {
          const src = `import type {${flowType}, PureComponent} from 'react';`;
          const expected = `import type {${tsType}, PureComponent} from 'react';`;
          expect(await transform(src)).toBe(expected);
        });

        it(`transforms type imports of ${flowType} from react with multiple imports in opposite order`, async () => {
          const src = `import type {PureComponent, ${flowType}} from 'react';`;
          const expected = `import type {PureComponent, ${tsType}} from 'react';`;
          expect(await transform(src)).toBe(expected);
        });

        it(`does not transform type imports of ${flowType} from modules other than react`, async () => {
          const src = `import type {${flowType}} from 'node-js';`;
          const expected = `import type {${flowType}} from 'node-js';`;
          expect(await transform(src)).toBe(expected);
        });

        it(`transforms named type imports of ${flowType} from react`, async () => {
          const src = `import {type ${flowType}} from 'react';`;
          const expected = `import {${tsType}} from 'react';`;
          expect(await transform(src)).toBe(expected);
        });

        it(`removes name when as matches transformation for ${flowType} from react`, async () => {
          const src = `import type {${flowType} as ${tsType}} from 'react';`;
          const expected = `import type {${tsType}} from 'react';`;
          expect(await transform(src)).toBe(expected);
        });

        it(`transforms named type imports of ${flowType} from react with multiple imports`, async () => {
          const src = `import PureComponent, {type ${flowType}, FunctionComponent} from 'react';`;
          const expected = `import PureComponent, {${tsType}, FunctionComponent} from 'react';`;
          expect(await transform(src)).toBe(expected);
        });

        it(`does not transform named type imports of ${flowType} from modules other than react`, async () => {
          const src = `import {type ${flowType}} from 'node-js';`;
          const expected = `import {${flowType}} from 'node-js';`;
          expect(await transform(src)).toBe(expected);
        });
      });
    });
  });

  /*
  May not work like their comments suggest
  it('transforms function parameters', async () => {
    const src = `function foo(a?: string, b: T){};`;
    const expected = `function foo(a: string | undefined, b: T){};`;
    expect(await transform(src)).toBe(expected);
  });
  */

  it("readonly class decls", async () => {
    const src = `class Foo { +prop: boolean; };`;
    const expected = `class Foo { readonly prop: boolean; };`;
    expect(await transform(src)).toBe(expected);
  });

  it("removes annotations from constructors", async () => {
    const src = dedent`class Test {
      constructor(props: any): void {
          console.log('test');
      }
    }`;
    const expected = dedent`class Test {
      constructor(props: any) {
          console.log('test');
      }
    }`;
    expect(await transform(src)).toBe(expected);
  });

  it("fixes static methods when class has a generic", async () => {
    const src = dedent`class MyFoo<T> {
      static myMethod(bar: T) {}
    }`;
    const expected = dedent`class MyFoo<T> {
      static myMethod<T>(bar: T) {}
    }`;
    expect(await transform(src)).toBe(expected);
  });

  it("fixes static methods when class has a generic that is bound", async () => {
    const src = dedent`class MyFoo<T: number> {
      static myMethod(bar: T) {}
    }`;
    const expected = dedent`class MyFoo<T extends number> {
      static myMethod<T extends number>(bar: T) {}
    }`;
    expect(await transform(src)).toBe(expected);
  });

  it("transforms extended generic class declarations", async () => {
    const src = dedent`
    class Base<P = {}, S = {}> {};
    class Impl extends Base<Function, {}> {};
    `;
    const expected = dedent`
    class Base<P = any, S = any> {};
    class Impl extends Base<any, Record<any, any>> {};
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("removes trailing commas from extended generic class declarations", async () => {
    const src = dedent`
    class Base<P = any, S = any> {};
    class Impl extends Base<{},> {};
    `;
    const expected = dedent`
    class Base<P = any, S = any> {};
    class Impl extends Base<Record<any, any>> {};
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("converts $Shape to Partial", async () => {
    const src = `type Test = $Shape<T>;`;
    const expected = `type Test = Partial<T>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("converts MapOf to Record", async () => {
    const src = `type Test = MapOf<T>;`;
    const expected = `type Test = Record<string, T>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("converts MapOfWithKeyType to Record", async () => {
    const src = `type Test = MapOfWithKeyType<S, T>;`;
    const expected = `type Test = Record<S, T>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("removes unnecessary $Exact types", async () => {
    const src = `type Test = $Exact<T>;`;
    const expected = `type Test = T;`;
    expect(await transform(src)).toBe(expected);
  });

  it("converts $Exact spreads", async () => {
    const src = `type Test = {...$Exact<T>};`;
    const expected = `type Test = (T);`;
    expect(await transform(src)).toBe(expected);
  });

  it("converts more complicated $Exact types", async () => {
    const src = dedent`type Test = $Exact<T | { foo: string }>;`;
    const expected = dedent`type Test = T | {
      foo: string
    };`;
    expect(await transform(src)).toBe(expected);
  });

  it("converts $Subtype to any", async () => {
    const src = `type Test = $Subtype<number>;`;
    const expected = dedent`
    type Test = any;`;
    expect(await transform(src)).toBe(expected);
    expectMigrationReporterMethodCalled("usedFlowSubtype");
  });

  it("Converts $Values to indexed access type", async () => {
    const src = `type Foo = $Values<T>;`;
    const expected = `type Foo = T[keyof T];`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts exported objects to as const", async () => {
    const src = `export const Obj = {'foo': 'bar'};`;
    const expected = `export const Obj = {'foo': 'bar'} as const;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts exported arrays to as const", async () => {
    const src = `export const Arr = [1,2];`;
    const expected = `export const Arr = [1,2] as const;`;
    expect(await transform(src)).toBe(expected);
  });

  it("does convert non exported objects to as const", async () => {
    const src = `const Obj = {'foo': 'bar'};`;
    const expected = `const Obj = {'foo': 'bar'} as const;`;
    expect(await transform(src)).toBe(expected);
    const arraySrc = `const Arr = [1,2];`;
    const arrayExpected = `const Arr = [1,2];`;

    expect(await transform(arraySrc)).toBe(arrayExpected);
  });

  it("does convert non exported arrays to as const", async () => {
    const arraySrc = `const Arr = [1,2];`;

    expect(await transform(arraySrc)).toBe(arraySrc);
  });

  it("does not convert non constants to as const", async () => {
    const src = `export var Obj = {'foo': 'bar'};`;
    expect(await transform(src)).toBe(src);
    const arraySrc = `export var Arr = [1,2];`;
    expect(await transform(arraySrc)).toBe(arraySrc);
  });

  it("does not convert typed constants to as const", async () => {
    const src = `export const Obj: MyObj = {'foo': 'bar'};`;
    expect(await transform(src)).toBe(src);
    const arraySrc = `export const Arr: MyArr = [1,2];`;
    expect(await transform(arraySrc)).toBe(arraySrc);
  });

  it("does not convert non objects as const", async () => {
    const src = `export const Boo = false;`;
    expect(await transform(src)).toBe(src);
  });

  describe("out of sequence optional parameters", () => {
    it("should handle optional parameters that are out of sequence", async () => {
      const src = dedent`
      function foo(a: ?number, b: ?number, c: string): number {}
    `;

      const expected = dedent`
    function foo(a: number | null | undefined, b: number | null | undefined, c: string): number {}
    `;

      expect(await transform(src)).toBe(expected);
    });

    it("should keep parameters as optional if possible", async () => {
      const src = dedent`
      function foo(a: ?number, b: number, c: ?string): number {}
    `;

      const expected = dedent`
    function foo(a: number | null | undefined, b: number, c?: string | null): number {}
    `;

      expect(await transform(src)).toBe(expected);
    });

    it("should keep all parameters as optional if none are required", async () => {
      const src = dedent`
      function foo(a: ?number, b: ?number, c: ?string): number {}
    `;

      const expected = dedent`
    function foo(a?: number | null, b?: number | null, c?: string | null): number {}
    `;

      expect(await transform(src)).toBe(expected);
    });

    it("handles function declarations as well", async () => {
      const src = dedent`export const setReactRef = function(
      ref: ?number,
      current: string
      ) {};`;
      const expected = dedent`
    export const setReactRef = function(
    ref: number | null | undefined,
    current: string
    ) {}; `;

      expect(await transform(src)).toBe(expected);
    });

    it("handles arrow functions also", async () => {
      const src = dedent`export const setReactRef = (
      ref: ?number,
      current: string
      ) => {};`;
      const expected = dedent`
    export const setReactRef = (
    ref: number | null | undefined,
    current: string
    ) => {}; `;

      expect(await transform(src)).toBe(expected);
    });

    it("handles class functions also", async () => {
      const src = dedent`export class MyClass {
      foo(bar: ?number, baz: string) {}
    }`;
      const expected = dedent`export class MyClass {
      foo(bar: number | null | undefined, baz: string) {}
    }`;

      expect(await transform(src)).toBe(expected);
    });

    it("handles class properties", async () => {
      const src = dedent`export class MyClass {
      foo: (bar: ?number, baz: string) => any;
    }`;
      const expected = dedent`export class MyClass {
      foo: (bar: number | null | undefined, baz: string) => any;
    }`;

      expect(await transform(src)).toBe(expected);
    });

    it("handles instantiated class properties", async () => {
      const src = dedent`export class MyClass {
      foo = (bar: ?number, baz: string) => {};
    }`;
      const expected = dedent`export class MyClass {
      foo = (bar: number | null | undefined, baz: string) => {};
    }`;

      expect(await transform(src)).toBe(expected);
    });

    it("handles optional parameters", async () => {
      const src = dedent`export default function (a?: string, b: number) {}`;
      const expected = dedent`export default function (a: string | null | undefined, b: number) {}`;
      expect(await transform(src)).toBe(expected);
    });
  });

  /*
  // This does not work, and the comment gets improperly linked as a trailing comment
  // to the node above. Unfortunately, this is a difficult issue to solve since it's caused
  // somewhere at the intersection of Babel and Recast comment parsing.
  it('Keeps comments in union declarations', async () => {
    const src = dedent`
      export type TestStatus =
        | 'first'
        | 'testing'
        // Comment
        | 'unknown';`;
    const expected = dedent`
        export type TestStatus =
          | 'first'
          | 'testing'
          // Comment
          | 'unknown';`;
    expect(await transform(src)).toBe(expected);
  });
  */

  // Try Catch

  it("Adds any to catch clause when parameter is present", async () => {
    const src = dedent`
    try {
      const foo = 'bar';
    } catch (e) {
      console.log(e);
    }
    `;
    const expected = dedent`
    try {
      const foo = 'bar';
    } catch (e: any) {
      console.log(e);
    }
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("Does not break if catch has no parameter", async () => {
    const src = dedent`
    try {
      const foo = 'bar';
    } catch {
      console.log(e);
    }
    `;
    expect(await transform(src)).toBe(src);
  });

  // React

  it("Converts React.Node to React.ReactNode in Props", async () => {
    const src = `type Props = {children?: React.Node};`;
    const expected = dedent`type Props = {
      children?: React.ReactNode
    };`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts makes sure React.Component is valid JSX, with no null for state", async () => {
    const src = dedent`class Foo extends React.Component<Props, null>  {
      test(): string {return 'string'};
    };`;
    const expected = dedent`class Foo extends React.Component<Props> {
      test(): string {return 'string'};
    };`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Node to React.ReactElement in render", async () => {
    const src = dedent`class Foo extends React.Component {
      render(): React.Node {return <div />};
    };`;
    const expected = dedent`class Foo extends React.Component {
      render(): React.ReactElement {return <div />};
    };`;
    expect(await transform(src)).toBe(expected);
  });

  it("Adds null to React.ReactElement in render", async () => {
    const src = dedent`class Foo extends React.Component {
      render(): React.Node {
        if (foo) return (<div />);
        return null;
      };
    };`;
    const expected = dedent`class Foo extends React.Component {
      render(): React.ReactElement | null {
        if (foo) return (<div />);
        return null;
      };
    };`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Node to React.ReactElement for render in arrow", async () => {
    const src = dedent`class Foo extends React.Component {
      render = (): React.Node => {return <div />};
    };`;
    const expected = dedent`class Foo extends React.Component {
      render = (): React.ReactElement => {return <div />};
    };`;
    expect(await transform(src)).toBe(expected);
  });

  it("Does not convert React.Node to React.ReactElement in non-render", async () => {
    const src = dedent`class Foo extends React.Component {
      rendering(): React.Node {return <div />};
    };`;
    const expected = dedent`class Foo extends React.Component {
      rendering(): React.ReactNode {return <div />};
    };`;
    expect(await transform(src)).toBe(expected);
  });

  describe("untyped usestate", () => {
    it("Applies any and creates warning for untyped empty useState.", async () => {
      const src = `const test = React.useState();`;
      const expected = `const test = React.useState<any>();`;
      expect(await transform(src)).toBe(expected);
      expectMigrationReporterMethodCalled("untypedStateInitialization");
    });

    it("Applies any and creates warning Creates a warning for untyped null useState.", async () => {
      const src = `const test = React.useState(null);`;
      const expected = `const test = React.useState<any>(null);`;
      expect(await transform(src)).toBe(expected);
      expectMigrationReporterMethodCalled("untypedStateInitialization");
    });

    it("Applies any and creates warning Creates a warning for untyped undefined useState.", async () => {
      const src = `const test = React.useState(undefined);`;
      const expected = `const test = React.useState<any>(undefined);`;
      expect(await transform(src)).toBe(expected);
      expectMigrationReporterMethodCalled("untypedStateInitialization");
    });

    it("Does not create a warning for typed null useState.", async () => {
      const src = `const test = React.useState<boolean>(null);`;
      expect(await transform(src)).toBe(src);
      expectMigrationReporterMethodNotCalled("untypedStateInitialization");
    });

    it("Does not create a warning for typed empty useState.", async () => {
      const src = dedent`
      // @flow
      const test = React.useState<boolean>();`;
      const expected = dedent`
      const test = React.useState<boolean>();`;
      expect(await transform(src)).toBe(expected);
      expectMigrationReporterMethodNotCalled("untypedStateInitialization");
    });

    it("Does not create a warning for inferred useState", async () => {
      const src = `const test = React.useState('test');`;
      expect(await transform(src)).toBe(src);
      expectMigrationReporterMethodNotCalled("untypedStateInitialization");
    });

    it("Does not create a warning for optional", async () => {
      const src = dedent`
      // @flow
      const [error, setError] = React.useState<?string>();`;
      const expected = dedent`
      const [error, setError] = React.useState<string | null | undefined>();`;
      expect(await transform(src)).toBe(expected);
      expectMigrationReporterMethodNotCalled("untypedStateInitialization");
    });

    it("Does not create a warning for or null", async () => {
      const rootSrc = `const test = React.useState<Test | null>(null);`;
      const src = dedent`
      // @flow
      ${rootSrc}`;
      expect(await transform(src)).toBe(rootSrc);
      expectMigrationReporterMethodNotCalled("untypedStateInitialization");
    });

    it("Does not create a warning for empty array", async () => {
      const rootSrc = `const [array, setArray] = React.useState<TestArray[]>([]);`;
      const src = dedent`
      // @flow
      ${rootSrc}`;
      expect(await transform(src)).toBe(rootSrc);
      expectMigrationReporterMethodNotCalled("untypedStateInitialization");
    });
  });

  describe("declaration files", () => {
    it("ignores declaration files", async () => {
      const src = `declare module '@fake/package' {};`;
      expect(await transform(src)).toBe(src);
      expectMigrationReporterMethodNotCalled("foundDeclarationFile");
    });
    it("ignores declaration files with vars", async () => {
      const src = `declare export var Integrations: any;`;
      expect(await transform(src)).toBe(src);
      expectMigrationReporterMethodNotCalled("foundDeclarationFile");
    });
    it("ignores declaration files with classes", async () => {
      const src = `declare class Hub {};`;
      expect(await transform(src)).toBe(src);
      expectMigrationReporterMethodNotCalled("foundDeclarationFile");
    });
  });

  describe("variable declaration", () => {
    it("should add a Record type annotation to objects declared as empty", async () => {
      const src = dedent`
      const a = {}
    `;
      const expected = dedent`
      const a: Record<string, any> = {}
    `;
      expect(await transform(src)).toBe(expected);
    });

    it("should not replace existing types if they exist", async () => {
      const src = dedent`
      const a: MyType = {}
    `;
      const expected = dedent`
      const a: MyType = {}
    `;
      expect(await transform(src)).toBe(expected);
    });

    it("should not add a type for complex objects", async () => {
      const src = dedent`
      const a = { test: 'test' }
    `;
      const expected = dedent`
      const a = { test: 'test' } as const
    `;
      expect(await transform(src)).toBe(expected);
    });
  });

  describe("Array deconstruction types", () => {
    it("should remove types from array deconstruction", async () => {
      const src = `const [filter: Filter, sort: Sort] = useState(defaultFilter);`;
      const expected = dedent`const [filter, sort] = useState(defaultFilter);`;
      expect(await transform(src)).toBe(expected);
    });

    it("should keep deconstruction types applied correctly", async () => {
      const src = `const [filter, sort]: [A, B] = useState(defaultFilter);`;
      expect(await transform(src)).toBe(src);
    });

    it("should supply types from array deconstruction in function declarations", async () => {
      const src = dedent`
      function fn1([filter: Filter, sort: Sort]) {}
      class Cls {fn2([filter: Filter, sort: Sort]) {}}
      const fn3 = ([filter: Filter, sort: Sort]) => {}
      class PrivateCls {#fn4([filter: Filter, sort: Sort]) {}}
      var obj1 = {fn5([filter: Filter, sort: Sort]) {}}
      var obj2 = {fn6: ([filter: Filter, sort: Sort]) => {}}
      `;
      const expected = dedent`
      function fn1([filter, sort]: [Filter, Sort]) {}
      class Cls {fn2([filter, sort]: [Filter, Sort]) {}}
      const fn3 = ([filter, sort]: [Filter, Sort]) => {}
      class PrivateCls {#fn4([filter, sort]: [Filter, Sort]) {}}
      var obj1 = {fn5([filter, sort]: [Filter, Sort]) {}}
      var obj2 = {fn6: ([filter, sort]: [Filter, Sort]) => {}}
      `;
      expect(await transform(src)).toBe(expected);
    });

    it("should supply any if one of the types is missing", async () => {
      const src = dedent`
      function fn1([filter, sort: Sort]) {}
      class Cls {fn2([filter, sort: Sort]) {}}
      const fn3 = ([filter, sort: Sort]) => {}
      class PrivateCls {#fn4([filter, sort: Sort]) {}}
      var obj1 = {fn5([filter, sort: Sort]) {}}
      var obj2 = {fn6: ([filter, sort: Sort]) => {}}
      `;
      const expected = dedent`
      function fn1([filter, sort]: [any, Sort]) {}
      class Cls {fn2([filter, sort]: [any, Sort]) {}}
      const fn3 = ([filter, sort]: [any, Sort]) => {}
      class PrivateCls {#fn4([filter, sort]: [any, Sort]) {}}
      var obj1 = {fn5([filter, sort]: [any, Sort]) {}}
      var obj2 = {fn6: ([filter, sort]: [any, Sort]) => {}}
      `;
      expect(await transform(src)).toBe(expected);
    });
    it("when a comment is in a type param declaration, it should preserve the newline", async () => {
      const src = dedent`
      const AThing: Array<
      // FlowFixMe
      number> = []
      `;

      const expected = dedent`
      const AThing: Array<
      // FlowFixMe
      number> = []
      `;

      expect(await transform(src)).toBe(expected);
    });
  });

  describe("for opaque types", () => {
    it("should transform a non-super type opaque type", async () => {
      const src = `opaque type ID = string`;
      const expected = `type ID = string;`;

      expect(await transform(src)).toBe(expected);
    });
    it("should transform an opaque super type as the normal type", async () => {
      const src = `opaque type ID: string = string`;
      const expected = `type ID = string;`;
      expect(await transform(src)).toBe(expected);
      expectMigrationReporterMethodCalled("opaqueSuperType");
    });
  });

  describe("handling empty array expressions", () => {
    it("should annotate when flow returns an array", async () => {
      const src = dedent`
      // @flow
      const arr = [];
      arr.push(1);
      arr.push(2);
      `;
      const expected = dedent`
      const arr: Array<number> = [];
      arr.push(1);
      arr.push(2);
      `;

      mockFlowTypeAtPos.mockResolvedValue(
        t.genericTypeAnnotation(
          t.identifier("Array"),
          t.typeParameterInstantiation([t.numberTypeAnnotation()])
        )
      );

      expect(await transform(src)).toBe(expected);
    });

    it("should annotate when flow returns empty", async () => {
      const src = dedent`
      // @flow
      const arr = [];
      `;
      const expected = dedent`
      const arr: any = [];
      `;

      mockFlowTypeAtPos.mockResolvedValue(t.emptyTypeAnnotation());

      expect(await transform(src)).toBe(expected);
    });

    it("should skip flow checking when disable flow is set", async () => {
      const src = dedent`
      // @flow
      const arr = []
      `;
      const expected = dedent`
      const arr: unknown = [];
      `;

      expect(
        await transform(src, stateBuilder({ config: { disableFlow: true } }))
      ).toBe(expected);
    });

    it("should handle when flow throws an exception", async () => {
      const src = dedent`
      // @flow
      const arr = [];
      `;
      const expected = dedent`
      const arr = [];
      `;

      mockFlowTypeAtPos.mockRejectedValue(new Error("Flow failed"));

      expect(await transform(src)).toBe(expected);
    });
  });
});
