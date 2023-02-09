import {
  expectMigrationReporterMethodCalled,
  transform,
  stateBuilder,
  MockedMigrationReporter,
  expectMigrationReporterMethodNotCalled,
} from "../utils/testing";

jest.mock("../../runner/migration-reporter/migration-reporter.ts");

afterEach(MockedMigrationReporter.mockReset);

describe("transform spread JSX attributes", () => {
  it("should convert functional components", async () => {
    const src = `
    type Props = { it: string, foo: number };

    function Foobar(x: Props) { 
      const { it, ...rest } = x;
      return <Mine it={it} {...rest} />
    }`;
    const expected = `
    import {Flow} from 'flow-to-typescript-codemod';
    type Props = {
      it: string,
      foo: number
    };

    function Foobar(x: Props & Omit<Omit<Flow.ComponentProps<typeof Mine>, 'it'>, keyof Props>) { 
      const { it, ...rest } = x;
      return <Mine it={it} {...rest} />
    }`;

    expect(
      await transform(
        src,
        stateBuilder({ config: { convertJSXSpreads: true } })
      )
    ).toBe(expected);
    expectMigrationReporterMethodCalled("usedJSXSpread");
  });

  it("should convert arrow functional components", async () => {
    const src = `
    type Props = { it: string, foo: number };

    const Foobar = (x: Props) => { 
      const { it, ...rest } = x;
      return <Mine it={it} {...rest} />
    }`;
    const expected = `
    import {Flow} from 'flow-to-typescript-codemod';
    type Props = {
      it: string,
      foo: number
    };

    const Foobar = (x: Props & Omit<Omit<Flow.ComponentProps<typeof Mine>, 'it'>, keyof Props>) => { 
      const { it, ...rest } = x;
      return <Mine it={it} {...rest} />
    }`;

    expect(
      await transform(
        src,
        stateBuilder({ config: { convertJSXSpreads: true } })
      )
    ).toBe(expected);
    expectMigrationReporterMethodCalled("usedJSXSpread");
  });

  it("should only convert a spread component one time", async () => {
    const src = `
    type Props = { it: string, foo: number };

    function Foobar(x: Props) { 
      const { it, ...rest } = x;
      if (true) {
        return <Mine it={it} {...rest} />
      }

      return <Mine {...rest} />
    }`;
    const expected = `
    import {Flow} from 'flow-to-typescript-codemod';
    type Props = {
      it: string,
      foo: number
    };

    function Foobar(x: Props & Omit<Omit<Flow.ComponentProps<typeof Mine>, 'it'>, keyof Props>) { 
      const { it, ...rest } = x;
      if (true) {
        return <Mine it={it} {...rest} />
      }

      return <Mine {...rest} />
    }`;

    expect(
      await transform(
        src,
        stateBuilder({ config: { convertJSXSpreads: true } })
      )
    ).toBe(expected);
    expectMigrationReporterMethodCalled("usedJSXSpread");
  });

  it("should transform classes as expected", async () => {
    const src = `
    type Props = { it: string, foo: number };

    class MyComponent extends React.Component<Props> {
      render() {
        const { it, ...rest } = this.props;

        return <Mine it={it} {...rest} />;
      }
    }`;

    const expected = `
    import {Flow} from 'flow-to-typescript-codemod';
    type Props = {
      it: string,
      foo: number
    };

    class MyComponent extends React.Component<Props & Omit<Omit<Flow.ComponentProps<typeof Mine>, 'it'>, keyof Props>> {
      render() {
        const { it, ...rest } = this.props;

        return <Mine it={it} {...rest} />;
      }
    }`;

    expect(
      await transform(
        src,
        stateBuilder({ config: { convertJSXSpreads: true } })
      )
    ).toBe(expected);
    expectMigrationReporterMethodCalled("usedJSXSpread");
  });

  it("will omit any passed in props already", async () => {
    const src = `
    type Props = { it: string, foo: number };

    class MyComponent extends React.Component<Props> {
      render() {
        const { it, ...rest } = this.props;

        return <Mine {...rest} it={it} />;
      }
    }`;

    const expected = `
    import {Flow} from 'flow-to-typescript-codemod';
    type Props = {
      it: string,
      foo: number
    };

    class MyComponent extends React.Component<Props & Omit<Omit<Flow.ComponentProps<typeof Mine>, 'it'>, keyof Props>> {
      render() {
        const { it, ...rest } = this.props;

        return <Mine {...rest} it={it} />;
      }
    }`;

    expect(
      await transform(
        src,
        stateBuilder({ config: { convertJSXSpreads: true } })
      )
    ).toBe(expected);
    expectMigrationReporterMethodCalled("usedJSXSpread");
  });

  it("does not change if the jsx spread config is not set", async () => {
    const src = `
    type Props = { it: string, foo: number };

    class MyComponent extends React.Component<Props> {
      render() {
        const { it, ...rest } = this.props;

        return <Mine {...rest} it={it} />;
      }
    }`;

    const expected = `
    type Props = {
      it: string,
      foo: number
    };

    class MyComponent extends React.Component<Props> {
      render() {
        const { it, ...rest } = this.props;

        return <Mine {...rest} it={it} />;
      }
    }`;

    expect(
      await transform(
        src,
        stateBuilder({ config: { convertJSXSpreads: false } })
      )
    ).toBe(expected);
  });

  it("should not lose State typings for class components", async () => {
    const src = `
    type State = { thing: boolean }
    type Props = { it: string, foo: number };

    class MyComponent extends React.Component<Props, State> {
      render() {
        const { it, ...rest } = this.props;

        return <Mine it={it} {...rest} />;
      }
    }`;

    const expected = `
    import {Flow} from 'flow-to-typescript-codemod';
    type State = {
      thing: boolean
    };
    type Props = {
      it: string,
      foo: number
    };

    class MyComponent extends React.Component<Props & Omit<Omit<Flow.ComponentProps<typeof Mine>, 'it'>, keyof Props>, State> {
      render() {
        const { it, ...rest } = this.props;

        return <Mine it={it} {...rest} />;
      }
    }`;

    expect(
      await transform(
        src,
        stateBuilder({ config: { convertJSXSpreads: true } })
      )
    ).toBe(expected);
    expectMigrationReporterMethodCalled("usedJSXSpread");
  });

  it("outputs the correct type if there are no omitted props", async () => {
    const src = `
    type Props = { it: string, foo: number };

    function Foobar(x: Props) { 
      const { it, ...rest } = x;
      return <Mine {...rest} />
    }`;
    const expected = `
    import {Flow} from 'flow-to-typescript-codemod';
    type Props = {
      it: string,
      foo: number
    };

    function Foobar(x: Props & Omit<Flow.ComponentProps<typeof Mine>, keyof Props>) { 
      const { it, ...rest } = x;
      return <Mine {...rest} />
    }`;

    expect(
      await transform(
        src,
        stateBuilder({ config: { convertJSXSpreads: true } })
      )
    ).toBe(expected);
    expectMigrationReporterMethodCalled("usedJSXSpread");
  });

  it("ignores variable assigned components", async () => {
    const src = `
    type Props = { it: string, foo: number };

    function Foobar(x: Props) { 
      const { it, ...rest } = x;
      const El = Mine;
      return <El it={it} {...rest} />
    }`;
    const expected = `
    type Props = {
      it: string,
      foo: number
    };

    function Foobar(x: Props) { 
      const { it, ...rest } = x;
      const El = Mine;
      return <El it={it} {...rest} />
    }`;

    expect(
      await transform(
        src,
        stateBuilder({ config: { convertJSXSpreads: true } })
      )
    ).toBe(expected);
    expectMigrationReporterMethodNotCalled("usedJSXSpread");
  });
});
