import dedent from "dedent";
import { stateBuilder, transform } from "../utils/testing";
import { executeFlowTypeAtPos } from "./execute-type-at-pos";

jest.mock("./execute-type-at-pos.ts");
const mockedExecuteFlowTypeAtPos = <
  jest.MockedFunction<typeof executeFlowTypeAtPos>
>executeFlowTypeAtPos;

describe("implied params", () => {
  afterEach(mockedExecuteFlowTypeAtPos.mockReset);

  it("does annotate function expressions without a type annotation", async () => {
    const src = dedent`
    const add = function (num1, num2) {
      return num1 + num2;
    }
    `;
    const expected = dedent`
    const add = function (num1: number, num2: number) {
      return num1 + num2;
    }
    `;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(expected);
    expect(mockedExecuteFlowTypeAtPos).toHaveBeenCalledTimes(2);
  });

  it("does not annotate function expressions with a type annotation", async () => {
    const src = dedent`
    type Type = (num1: number, num2: number) => number;
    const add: Type = function (num1, num2) {
      return num1 + num2;
    }
    `;
    const expected = dedent`
    type Type = (num1: number, num2: number) => number;
    const add: Type = function (num1, num2) {
      return num1 + num2;
    }
    `;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(expected);
    expect(mockedExecuteFlowTypeAtPos).not.toHaveBeenCalled();
  });

  it("does annotate function expressions without a type annotation", async () => {
    const src = dedent`
    const add = (num1, num2) => num1 + num2;
    `;
    const expected = dedent`
    const add = (num1: number, num2: number) => num1 + num2;
    `;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(expected);
    expect(mockedExecuteFlowTypeAtPos).toHaveBeenCalledTimes(2);
  });

  it("does not annotate function expressions with a type annotation", async () => {
    const src = dedent`
    type Type = (num1: number, num2: number) => number;
    const add: Type = (num1, num2) => num1 + num2;
    `;

    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(src);
    expect(mockedExecuteFlowTypeAtPos).not.toHaveBeenCalled();
  });

  it("does not annotate function expressions within an object property", async () => {
    const src = dedent`
    test({
      propLink: (props) => {},
      foo: 'bar'
    });
    `;

    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(src);
    expect(mockedExecuteFlowTypeAtPos).not.toHaveBeenCalled();
  });

  it("does annotate arrow expressions without a type annotation", async () => {
    const src = dedent`
    const add = (num1, num2) => num1 + num2;
    `;
    const expected = dedent`
    const add = (num1: number, num2: number) => num1 + num2;
    `;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(expected);
    expect(mockedExecuteFlowTypeAtPos).toHaveBeenCalledTimes(2);
  });

  it("does not annotate arrow expressions with a type annotation", async () => {
    const src = dedent`
    type Type = (num1: number, num2: number) => number;
    const add: Type = (num1, num2) => num1 + num2;
    `;

    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(src);
    expect(mockedExecuteFlowTypeAtPos).not.toHaveBeenCalled();
  });

  it("does not annotate function expressions inside a React component", async () => {
    const src = dedent`
    <Element arg={(num1, num2) => num1 + num2} />
    `;

    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(src);
    expect(mockedExecuteFlowTypeAtPos).toHaveBeenCalledTimes(0);
  });

  it("does annotate an untyped method inside a class", async () => {
    const src = dedent`
    class Foo {
      add(num1, num2) {
        return num1 + num2;
      }
    }
    `;
    const expected = dedent`
    class Foo {
      add(num1: number, num2: number) {
        return num1 + num2;
      }
    }
    `;

    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(expected);
    expect(mockedExecuteFlowTypeAtPos).toHaveBeenCalledTimes(2);
  });

  it("does not annotate a typed method inside a class", async () => {
    const src = dedent`
    class Foo {
      add: Type = function(num1: number, num2: number) {
        return num1 + num2;
      };
    };
    `;

    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(src);
    expect(mockedExecuteFlowTypeAtPos).not.toHaveBeenCalled();
  });

  it("does not annotate a function defined inside a call expression", async () => {
    const src = dedent`
    fn((num1, num2) => num1 + num2);
    `;

    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(src);
    expect(mockedExecuteFlowTypeAtPos).not.toHaveBeenCalled();
  });

  it("does annotate object methods in a React.createReactClass", async () => {
    const src = dedent`
    React.createReactClass({
      add(num1, num2) {
        return num1 + num2;
      }
    });
    `;
    const expected = dedent`
    React.createReactClass({
      add(num1: number, num2: number) {
        return num1 + num2;
      }
    });
    `;

    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(expected);
    expect(mockedExecuteFlowTypeAtPos).toHaveBeenCalledTimes(2);
  });

  it("does not annotate functions with a type assertion", async () => {
    const src = dedent`
    // @flow
    const add = (((num1, num2) => num1 + num2): Type);
    `;

    const expected = dedent`
    const add = (((num1, num2) => (num1 + num2)) as Type);
    `;

    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(expected);
    expect(mockedExecuteFlowTypeAtPos).not.toHaveBeenCalled();
  });

  // If the parent is a function with a return type we don't need to type parameters
  it("does not annotate functions within a return type", async () => {
    const src = dedent`
    // @flow
    (): TestFunction => (param) => {
      return null;
      };
    `;

    const expected = dedent`
    (): TestFunction => (param) => {
      return null;
      };
    `;

    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(expected);
    expect(mockedExecuteFlowTypeAtPos).not.toHaveBeenCalled();
  });

  it("does annotate arrow functions without a return type", async () => {
    const src = dedent`
      // @flow
      () => (param) => {
        return null;
        };
      `;

    const expected = dedent`
      () => (param: number) => {
        return null;
        };
      `;

    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "number"}');
    expect(await transform(src)).toBe(expected);
    expect(mockedExecuteFlowTypeAtPos).toHaveBeenCalled();
  });

  it("skips flow checking if disable flow is passed in", async () => {
    const src = dedent`
    const add = function (num1, num2) {
      return num1 + num2;
    }
    `;
    const expected = dedent`
    const add = function (num1: unknown, num2: unknown) {
      return num1 + num2;
    }
    `;

    expect(
      await transform(src, stateBuilder({ config: { disableFlow: true } }))
    ).toBe(expected);
  });
});
