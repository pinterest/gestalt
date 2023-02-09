import dedent from "dedent";
import { transform, stateBuilder } from "./utils/testing";

describe("transform type annotations", () => {
  // React
  it("Converts React$Node to React.ReactNode", async () => {
    const src = `type Foo = React$Node;`;
    const expected = `type Foo = React.ReactNode;`;
    expect(await transform(src)).toBe(expected);
  });

  it("converts React$Context", async () => {
    const src = `const Context: React$Context<T> = React.createContext(T);`;
    const expected = `const Context: React.Context<T> = React.createContext(T);`;
    expect(await transform(src)).toBe(expected);
  });

  it("converts React$Element", async () => {
    const src = `const Component = (props: Props): React$Element => {return <div />};`;
    const expected = `const Component = (props: Props): React.Element => {return <div />};`;
    expect(await transform(src)).toBe(expected);
  });

  it("converts moment$", async () => {
    const src = `type Test = moment$Test;`;
    const expected = `type Test = moment.Test;`;
    expect(await transform(src)).toBe(expected);
  });

  it("converts Flow namespaces", async () => {
    const src = `const Component = (props: Props): Any$Thing => {return <div />};`;
    const expected = `const Component = (props: Props): Any.Thing => {return <div />};`;
    expect(await transform(src)).toBe(expected);
  });

  it("does not convert Flow namespace when keepPrivateTypes is set", async () => {
    const state = stateBuilder({
      config: {
        keepPrivateTypes: true,
      },
    });
    const src = `const Component = (props: Props): Any$Thing => {return <div />};`;
    expect(await transform(src, state)).toBe(src);
  });

  it("Converts private types in type parameter instantiations", async () => {
    const src = dedent`
    // @flow
    const test = React.useRef<React$ElementRef<'div'>>(null);
    `;
    const expected = dedent`
    const test = React.useRef<React.ElementRef<'div'>>(null);
    `;
    expect(await transform(src)).toBe(expected);
  });

  describe("with props", () => {
    it("replaces $FlowFixMe no matter what", async () => {
      const state = stateBuilder({
        config: {
          keepPrivateTypes: false,
        },
      });
      const src = dedent`
      // @flow
      class Dashhboard extends Component<$FlowFixMeProps> {}`;
      const expected = dedent`
      class Dashhboard extends Component<any> {}`;
      expect(await transform(src, state)).toBe(expected);
    });
  });
});
