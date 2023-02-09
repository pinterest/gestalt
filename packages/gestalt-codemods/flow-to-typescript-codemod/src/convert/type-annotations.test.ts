import dedent from "dedent";
import { ConfigurableTypeProvider } from "./utils/configurable-type-provider";
import {
  stateBuilder,
  transform,
  expectMigrationReporterMethodCalled,
  expectMigrationReporterMethodNotCalled,
} from "./utils/testing";

jest.mock("../runner/migration-reporter/migration-reporter.ts");

describe("transform type annotations", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Marks void or null parameters optional", async () => {
    const src = `function f(x: ?T){};`;
    const expected = `function f(x?: T | null){};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Marks void parameters optional", async () => {
    const src = `function f(x: T | void){};`;
    const expected = `function f(x?: T){};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Avoids marking void parameters if followed by non-optional", async () => {
    const src = `function f(x: void, y: string){};`;
    const expected = `function f(x: undefined, y: string){};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Marks void as optional if no other parameters", async () => {
    const src = `function f(x: string | void, y?: string){};`;
    const expected = `function f(x?: string, y?: string){};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Marks multiple void parameters optional with unions", async () => {
    const src = `function f(x: T | void, y: ?string){};`;
    const expected = `function f(x?: T, y?: string | null){};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Avoids optionals preceding nullables", async () => {
    const src = `function f(x: ?T, y: string){};`;
    const expected = `function f(x: T | null | undefined, y: string){};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Avoids optionals preceding non-optional unions", async () => {
    const src = `function f(x: T | void, y: string){};`;
    const expected = `function f(x: T | undefined, y: string){};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Convertsions optional unions preceding optionals", async () => {
    const src = `function f(x: T | void, y?: string){};`;
    const expected = `function f(x?: T, y?: string){};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts void types to undefined", async () => {
    const src = dedent`
    const a: string = "";
    const b: ?string = (str: string | void);`;
    const expected = dedent`
    const a: string = "";
    const b: string | null | undefined = (str as string | undefined);`;
    expect(await transform(src)).toBe(expected);
  });

  it("Keeps void promises as void", async () => {
    const src = `function f(): Promise<void> {};`;
    const expected = `function f(): Promise<void> {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("does not convert void return types for functions to undefined", async () => {
    const src = `function fn(): void {};`;
    expect(await transform(src)).toBe(src);
  });

  it("does not convert void return types for arrow functions to undefined", async () => {
    const src = `(): void => {};`;
    expect(await transform(src)).toBe(src);
  });

  it("does not convert void return types for function expressions to undefined", async () => {
    const src = `const fn = (): void => {};`;
    expect(await transform(src)).toBe(src);
  });

  it("does not convert void return types for class methods to undefined", async () => {
    const src = dedent`
    class C {
      fn(): void {} 
    }`;
    expect(await transform(src)).toBe(src);
  });

  describe("converts literal types", () => {
    it("does not modify string literals", async () => {
      const src = dedent`const foo: string = 'foo';`;
      expect(await transform(src)).toBe(src);
      expectMigrationReporterMethodNotCalled("nonLiteralFlowType");
    });

    it("does not modify symbol literals", async () => {
      const src = dedent`const foo: symbol = 'foo';`;
      expect(await transform(src)).toBe(src);
      expectMigrationReporterMethodNotCalled("unhandledFlowInputNode");
    });

    it("converts string non literals", async () => {
      const src = dedent`const foo: String = 'foo';`;
      const expected = dedent`const foo: string = 'foo';`;
      expect(await transform(src)).toBe(expected);
      expectMigrationReporterMethodCalled("nonLiteralFlowType");
    });

    it("does not modify number literals", async () => {
      const src = dedent`const foo: number = 42;`;
      expect(await transform(src)).toBe(src);
      expectMigrationReporterMethodNotCalled("nonLiteralFlowType");
    });

    it("converts number non literals", async () => {
      const src = dedent`const foo: Number = 'foo';`;
      const expected = dedent`const foo: number = 'foo';`;
      expect(await transform(src)).toBe(expected);
      expectMigrationReporterMethodCalled("nonLiteralFlowType");
    });

    it("converts boolean non literals", async () => {
      const src = dedent`const foo: Boolean = 'foo';`;
      const expected = dedent`const foo: boolean = 'foo';`;
      expect(await transform(src)).toBe(expected);
      expectMigrationReporterMethodCalled("nonLiteralFlowType");
    });

    it("converts symbol non literals", async () => {
      const src = dedent`const foo: Symbol = 'foo';`;
      const expected = dedent`const foo: symbol = 'foo';`;
      expect(await transform(src)).toBe(expected);
      expectMigrationReporterMethodCalled("nonLiteralFlowType");
    });
  });

  it("Converts non-standard Object key types to records", async () => {
    const src = `const MyObj: {[KeyType]: ValueType} = {};`;
    const expected = `const MyObj: Partial<Record<KeyType, ValueType>> = {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Does not convert string Object key types to records", async () => {
    const src = `const MyObj: {[key: string]: ValueType} = {};`;
    const expected = dedent`const MyObj: {
      [key: string]: ValueType
    } = {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Does not convert number Object key types to records", async () => {
    const src = `const MyObj: {[key: number]: ValueType} = {};`;
    const expected = dedent`const MyObj: {
      [key: number]: ValueType
    } = {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts type parameter instantiations inside call expressions", async () => {
    const src = dedent`
    // @flow
    const test = React.useRef<Object>(null);
    `;
    const expected = dedent`
    const test = React.useRef<any>(null);
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts type parameter instantiations with union types", async () => {
    const src = dedent`
    // @flow
    const test = React.useRef<Object | null>(null);
    `;
    const expected = dedent`
    const test = React.useRef<any | null>(null);
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts multiple in call expressions", async () => {
    const src = dedent`
    // @flow
    const test = React.useRef<$Shape<T> | $ReadOnly<T>>(null);
    `;
    const expected = dedent`
    const test = React.useRef<Partial<T> | Readonly<T>>(null);
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("Handles empty call expressions", async () => {
    const src = dedent`
    // @flow
    const test = React.useRef<>(null);
    `;
    const expected = dedent`
    const test = React.useRef<>(null);
    `;
    expect(await transform(src)).toBe(expected);
  });

  // Synthetic Events

  describe("synthetic events", () => {
    it("Converts SyntheticMouseEvent", async () => {
      const src = `const handler = (e: SyntheticMouseEvent) => {console.log(e)};`;
      const expected = `const handler = (e: React.MouseEvent) => {console.log(e)};`;
      expect(await transform(src)).toBe(expected);
    });

    it("Converts SyntheticMouseEvent with params", async () => {
      const src = `const handler = (e: SyntheticMouseEvent<HTMLButtonElement>) => {console.log(e)};`;
      const expected = `const handler = (e: React.MouseEvent<HTMLButtonElement>) => {console.log(e)};`;
      expect(await transform(src)).toBe(expected);
    });

    it("Converts SyntheticInputEvent and adds input type", async () => {
      const src = `const handler = (e: SyntheticInputEvent) => {console.log(e)};`;
      const expected = `const handler = (e: React.ChangeEvent<HTMLInputElement>) => {console.log(e)};`;
      expect(await transform(src)).toBe(expected);
    });

    it("Converts SyntheticInputEvent with open params", async () => {
      const src = `const handler = (e: SyntheticInputEvent<>) => {console.log(e)};`;
      const expected = `const handler = (e: React.ChangeEvent<HTMLInputElement>) => {console.log(e)};`;
      expect(await transform(src)).toBe(expected);
    });

    it("Converts SyntheticInputEvent and keeps params", async () => {
      const src = `const handler = (e: SyntheticInputEvent<HTMLButtonElement>) => {console.log(e)};`;
      const expected = `const handler = (e: React.ChangeEvent<HTMLButtonElement>) => {console.log(e)};`;
      expect(await transform(src)).toBe(expected);
    });

    it("Converts SyntheticEvent to Event", async () => {
      const src = `const handler = (e: SyntheticEvent<>) => {console.log(e)};`;
      const expected = `const handler = (e: React.SyntheticEvent) => {console.log(e)};`;
      expect(await transform(src)).toBe(expected);
    });
  });

  it("Converts SyntheticEvent to Event with params", async () => {
    const src = `const handler = (e: SyntheticEvent<HTMLElement>) => {console.log(e)};`;
    const expected = `const handler = (e: React.SyntheticEvent<HTMLElement>) => {console.log(e)};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts JestMockFn", async () => {
    const src = dedent`
    const test: string = "";
    (test: JestMockFn<any, any>);
    `;
    const expected = dedent`
    const test: string = "";
    (test as jest.MockedFunction<typeof test>);
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts JestMockFn with function call", async () => {
    const src = dedent`
    const test: string = "";
    (test: JestMockFn<any, any>).mockImplementation();
    `;
    const expected = dedent`
    const test: string = "";
    (test as jest.MockedFunction<typeof test>).mockImplementation();
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts JestMockFn on object", async () => {
    const src = dedent`
    (test.a: JestMockFn<any, any>);
    `;
    const expected = dedent`
    (test.a as jest.MockedFunction<typeof test.a>);
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts JestMockFn on object with function call", async () => {
    const src = dedent`
    (test.a: JestMockFn<any, any>).mockImplementation();
    `;
    const expected = dedent`
    (test.a as jest.MockedFunction<typeof test.a>).mockImplementation();
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts JestMockFn on nested objects", async () => {
    const src = dedent`
    (test.a.b: JestMockFn<any, any>);
    `;
    const expected = dedent`
    (test.a.b as jest.MockedFunction<typeof test.a.b>);
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts JestMockFn where no input type is defined", async () => {
    const src = dedent`
    type MockApiOptions = {
      errors: JestMockFn<any, any>
    };
    `;
    const expected = dedent`
    type MockApiOptions = {
      errors: jest.MockedFunction<any>
    };
    `;
    expect(await transform(src)).toBe(expected);
  });

  // Moment

  it("Converts MomentDuration", async () => {
    const src = `type Test = moment.MomentDuration;`;
    const expected = `type Test = moment.Duration;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts moment", async () => {
    const src = dedent`type Test = {
      startDate: moment
    };`;
    const expected = dedent`type Test = {
      startDate: moment.Moment
    };`;
    expect(await transform(src)).toBe(expected);
  });

  // Window
  it("Converts known window namespaced types", async () => {
    const src = `type Test = window.HTMLInputElement;`;
    const expected = `type Test = HTMLInputElement;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts unknown window namespaced types to any", async () => {
    const src = `type Test = window.UnknownHtmlElement;`;
    const expected = `type Test = any;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Does not convert window namespaced values", async () => {
    const src = `const elemProto = (window.HTMLElement || window.Element).prototype;`;
    expect(await transform(src)).toBe(src);
  });

  // React

  it("Converts React.Node to React.ReactElement in function return", async () => {
    const src = `const Component = (props: Props): React.Node => {return <div />};`;
    const expected = `const Component = (props: Props): React.ReactElement => {return <div />};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Element", async () => {
    const src = `function f(): React.Element<T> {};`;
    const expected = `function f(): React.ReactElement<React.ComponentProps<T>> {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Text", async () => {
    const src = `function f(): React.Text {};`;
    const expected = `function f(): React.ReactText {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Child", async () => {
    const src = `function f(): React.Child {};`;
    const expected = `function f(): React.ReactChild {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Children", async () => {
    const src = `function f(): React.Children {};`;
    const expected = `function f(): React.ReactChildren {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Fragment", async () => {
    const src = `function f(): React.Fragment {};`;
    const expected = `function f(): React.ReactFragment {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Portal", async () => {
    const src = `function f(): React.Portal {};`;
    const expected = `function f(): React.ReactPortal {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Config", async () => {
    const src = dedent`const Test = (
      props: React.Config<Props, DefaultProps>,
    ) => {
      return <Test {...props} globals={globals} />;
    };`;
    const expected = dedent`const Test = (
      props: Props & DefaultProps,
    ) => {
      return <Test {...props} globals={globals} />;
    };`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.ElementProps", async () => {
    const src = `function f(): React.ElementProps {};`;
    const expected = `function f(): React.ComponentProps {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.StatelessFunctionalComponent", async () => {
    const src = `function f(): React.StatelessFunctionalComponent<Props> {};`;
    const expected = `function f(): React.FC<Props> {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.NodeArray", async () => {
    const src = `function f(): React.NodeArray {};`;
    const expected = `function f(): React.ReactNodeArray {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.MixedElement", async () => {
    const src = `function f(): React.MixedElement {};`;
    const expected = `function f(): React.ReactElement {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Portal with type parameters", async () => {
    const src = `function f(): React.Portal<Props> {};`;
    const expected = `function f(): React.ReactPortal<Props> {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Node to React.ReactElement in arrow function", async () => {
    const src = `const Component = (props: Props): React.Node => {return <div />};`;
    const expected = `const Component = (props: Props): React.ReactElement => {return <div />};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Node to React.ReactElement or null in arrow function return", async () => {
    const src = dedent`const Component = (props: Props): React.Node => {
      if (foo) return (<div />);
      return null;
    };`;
    const expected = dedent`const Component = (props: Props): React.ReactElement | null => {
      if (foo) return (<div />);
      return null;
    };`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Node to React.ReactElement in normal function", async () => {
    const src = `function Component(props: Props): React.Node {return <div />};`;
    const expected = `function Component(props: Props): React.ReactElement {return <div />};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.Node to React.ReactElement or null in normal function return", async () => {
    const src = dedent`function Component(props: Props): React.Node {
      if (foo) return (<div />);
      return null;
    };`;
    const expected = dedent`function Component(props: Props): React.ReactElement | null {
      if (foo) return (<div />);
      return null;
    };`;
    expect(await transform(src)).toBe(expected);
  });

  it("converts React$Context", async () => {
    const src = `const Context: React$Context<T> = React.createContext(T);`;
    const expected = `const Context: React.Context<T> = React.createContext(T);`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React$Element", async () => {
    const src = `function f(): React$Element<T> {};`;
    const expected = `function f(): React.ReactElement<React.ComponentProps<T>> {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React$Element in a declaration", async () => {
    const src = `export type SvgType = React$Element<'svg'>;`;
    const expected = `export type SvgType = React.ReactElement<React.ComponentProps<'svg'>>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.ElementConfig to JSX.LibraryManagedAttributes", async () => {
    const src = `type Test = React.ElementConfig<C>;`;
    const expected = `type Test = JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.ElementConfig and keeps typeof", async () => {
    const src = `type Test = React.ElementConfig<typeof C>;`;
    const expected = `type Test = JSX.LibraryManagedAttributes<typeof C, React.ComponentProps<typeof C>>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.ElementConfig with indexing", async () => {
    const src = `type Test = $PropertyType<React.ElementConfig<C>, 'foo'>;`;
    const expected = `type Test = JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>['foo'];`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.ChildrenArray to an array", async () => {
    const src = dedent`
    type Props = {
      children: React.ChildrenArray<MenuChildren>;
    };`;
    const expected = dedent`
    type Props = {
      children: Array<MenuChildren> | MenuChildren
    };`;
    expect(await transform(src)).toBe(expected);
  });

  // Utility Types
  it("Converts React.AbstractComponent to Flow.AbstractComponent", async () => {
    const src = `export type Component = React.AbstractComponent<Config, Instance>;`;
    const expected = dedent`
    import {Flow} from 'flow-to-typescript-codemod';
    export type Component = Flow.AbstractComponent<Config, Instance>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts React.AbstractComponent and matches parameters", async () => {
    const src = `export type Component = React.AbstractComponent<Config>;`;
    const expected = dedent`
    import {Flow} from 'flow-to-typescript-codemod';
    export type Component = Flow.AbstractComponent<Config>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts Object to any", async () => {
    const src = `export type Test = Object;`;
    const expected = dedent`
    export type Test = any;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts Object to Record<any, any> when useStrictAnyObjectType is enabled", async () => {
    const src = `export type Test = Object;`;
    const expected = dedent`
    export type Test = Record<any, any>;`;

    const state = stateBuilder({
      configurableTypeProvider: new ConfigurableTypeProvider({
        useStrictAnyFunctionType: false,
        useStrictAnyObjectType: true,
      }),
    });
    expect(await transform(src, state)).toBe(expected);
  });

  describe("Empty object type", () => {
    it("Converts {} to Record<any, any> in a functions return", async () => {
      const src = dedent`function f(): {} {return {}}
    let af: () => {}
    class C {
      m(): {} {return {}}
    }`;
      const expected = dedent`function f(): Record<any, any> {return {}}
    let af: () => Record<any, any>
    class C {
      m(): Record<any, any> {return {}}
    }`;

      const state = stateBuilder({});
      expect(await transform(src, state)).toBe(expected);
    });

    it("Does not convert {} to Record<any, any> if an object has any properties", async () => {
      // dedent messes up the indentation of the string
      const src = `function f(): {
  prop: boolean
} {return {}}
let af: () => {
  prop: boolean
}
class C {
  m(): {
    prop: boolean
  } {return {}}
}`;

      const state = stateBuilder({});
      expect(await transform(src, state)).toBe(src);
    });

    it("converts default empty object types to any", async () => {
      const src = `function f<T = {}>(a: T) {}`;
      const expected = `function f<T = any>(a: T) {}`;
      expect(await transform(src)).toBe(expected);
    });

    it("converts default empty object types to any in classes", async () => {
      const src = `class Cls<T = {}> {}`;
      const expected = `class Cls<T = any> {}`;
      expect(await transform(src)).toBe(expected);
    });

    it("converts assigned object types as Record", async () => {
      const src = `const a: {} = {}`;
      const expected = `const a: Record<any, any> = {}`;
      expect(await transform(src)).toBe(expected);
    });

    it("converts argument types as Record", async () => {
      const src = `function f(a: {}) {}`;
      const expected = `function f(a: Record<any, any>) {}`;
      expect(await transform(src)).toBe(expected);
    });

    it("converts type parameters as Record", async () => {
      const src = `function f(a: Optional<{}>) {}`;
      const expected = `function f(a: Optional<Record<any, any>>) {}`;
      expect(await transform(src)).toBe(expected);
    });
  });

  it("Converts Function to any", async () => {
    const src = `export type Test = Function;`;
    const expected = dedent`
    export type Test = any;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts Function to Function when useStrictAnyFunctionType is enabled", async () => {
    const src = `export type Test = Function;`;
    const expected = dedent`
    export type Test = Function;`;
    const state = stateBuilder({
      configurableTypeProvider: new ConfigurableTypeProvider({
        useStrictAnyFunctionType: true,
        useStrictAnyObjectType: false,
      }),
    });
    expect(await transform(src, state)).toBe(expected);
  });

  it("Converts $Subtype to any", async () => {
    const src = `export type Test = $Subtype<Foo>;`;
    const expected = dedent`
    export type Test = any;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts Class to Flow.Class", async () => {
    const src = `(storeClass: Class<Store>) => {};`;
    const expected = dedent`
    import {Flow} from 'flow-to-typescript-codemod';
    (storeClass: Flow.Class<Store>) => {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Does not convert Class without Type parameter", async () => {
    const src = `(storeClass: Class) => {};`;
    const expected = dedent`
    (storeClass: Class) => {};`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts $Diff to Flow.Diff", async () => {
    const src = `type Test = $Diff<A, B>;`;
    const expected = dedent`
    import {Flow} from 'flow-to-typescript-codemod';
    type Test = Flow.Diff<A, B>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Does not convert $Diff without parameters", async () => {
    const src = `type Test = $Diff;`;
    expect(await transform(src)).toBe(src);
  });

  it("Converts $Rest to Partial<Flow.Diff>", async () => {
    const src = `type Test = $Rest<A, B>;`;
    const expected = dedent`
    import {Flow} from 'flow-to-typescript-codemod';
    type Test = Partial<Flow.Diff<A, B>>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Does not convert $Rest without parameters", async () => {
    const src = `type Test = $Rest;`;
    expect(await transform(src)).toBe(src);
  });

  it("Converts $Call to ReturnType", async () => {
    const src = `type PropType = $Call<ExtractPropType>;`;
    const expected = dedent`
    type PropType = ReturnType<ExtractPropType>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts $Call and drops extra parameters", async () => {
    const src = `type PropType = $Call<ExtractPropType, Obj>;`;
    const expected = dedent`
    type PropType = ReturnType<ExtractPropType>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Does not convert $Call without parameters", async () => {
    const src = `type PropType = $Call;`;
    expect(await transform(src)).toBe(src);
  });

  it("Converts $NonMaybeType to NonNullable", async () => {
    const src = `type NonMaybeType = $NonMaybeType<?string>;`;
    const expected = dedent`
      type NonMaybeType = NonNullable<string | null | undefined>;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Does not convert $NonMaybeType without parameters", async () => {
    const src = `type nonMaybeType = $NonMaybeType;`;
    expect(await transform(src)).toBe(src);
  });

  // Global Types
  it("Converts TimeoutID to number", async () => {
    const src = `let timeout: TimeoutID;`;
    const expected = `let timeout: number;`;
    expect(await transform(src)).toBe(expected);
  });

  it("Converts IntervalID to number", async () => {
    const src = `let interval: IntervalID;`;
    const expected = `let interval: number;`;
    expect(await transform(src)).toBe(expected);
  });

  it("should convert exported ObjectTypeCallProperty types", async () => {
    const src = dedent`
    export type Test = {
      <T>(void | Example | Example[], ?() => T): T,
      (void | Example | Example[]): Attributes,
      foo: number
    };
    `;

    const expected = dedent`
    export type Test = {
      <T>(arg1: undefined | Example | Example[], arg2?: () => T | null | undefined): T,
      (arg1: undefined | Example | Example[]): Attributes,
      foo: number
    };
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("should convert non-exported ObjectTypeCallProperty types", async () => {
    const src = dedent`
    type Test = {
      <T>(void | Example | Example[], ?() => T): T,
      (void | Example | Example[]): Attributes,
      foo: number
    };
    `;

    const expected = dedent`
    type Test = {
      <T>(arg1: undefined | Example | Example[], arg2?: () => T | null | undefined): T,
      (arg1: undefined | Example | Example[]): Attributes,
      foo: number
    };
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("should not mark optional parameters as optional if it is syntactically incorrect", async () => {
    const src = dedent`
    function a(a?: string, b: string) {}
    `;

    const expected = dedent`
    function a(a: string | null | undefined, b: string) {}
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("should only mark optional parameters as optional if it is syntactically correct", async () => {
    const src = dedent`
    const f1: (arg1?: string) => any = A;
    const f2: (?string) => any = A;
    const f3: (?string, ?string) => any = A;
    const f4: (string, ?string) => any = A;
    const f5: (string, ?string, string) => any = A;
    const f6: (any) => any = A;
    `;

    const expected = dedent`
    const f1: (arg1?: string) => any = A;
    const f2: (arg1?: string | null | undefined) => any = A;
    const f3: (arg1?: string | null | undefined, arg2?: string | null | undefined) => any = A;
    const f4: (arg1: string, arg2?: string | null | undefined) => any = A;
    const f5: (arg1: string, arg2: string | null | undefined, arg3: string) => any = A;
    const f6: (arg1?: any) => any = A;
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("should mark optional types as optional, even without a name", async () => {
    const src = dedent`
    type Test = (?string) => string;
    `;

    const expected = dedent`
    type Test = (arg1?: string | null | undefined) => string;
    `;
    expect(await transform(src)).toBe(expected);
  });

  describe("RequestOptions", () => {
    it("Converts RequestOptions to RequestInit without params", async () => {
      const src = `const a: RequestOptions = {};`;
      const expected = dedent`const a: RequestInit = {};`;
      expect(await transform(src)).toBe(expected);
    });
  });

  describe("$ObjMap", () => {
    it("Converts $ObjMap to Flow.ObjMap", async () => {
      const src = `type Test = $ObjMap<A, B>;`;
      const expected = dedent`
      import {Flow} from 'flow-to-typescript-codemod';
      type Test = Flow.ObjMap<A, B>;`;
      expect(await transform(src)).toBe(expected);
    });

    it("Does not convert $Diff without parameters", async () => {
      const src = `type Test = $ObjMap;`;
      expect(await transform(src)).toBe(src);
    });
  });
  it("Handles unexpected type nodes", async () => {
    const src = dedent`
    function f(a: function){};`;
    const expected = `function f(a: unknown){};`;
    expect(await transform(src)).toBe(expected);
    expectMigrationReporterMethodCalled("unhandledFlowInputNode");
  });
});
