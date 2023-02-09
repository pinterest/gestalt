import dedent from "dedent";
import { transform } from "../utils/testing";
import { executeFlowTypeAtPos } from "./execute-type-at-pos";

jest.mock("./execute-type-at-pos.ts");
const mockedExecuteFlowTypeAtPos = <
  jest.MockedFunction<typeof executeFlowTypeAtPos>
>executeFlowTypeAtPos;

describe("type at position", () => {
  afterEach(mockedExecuteFlowTypeAtPos.mockReset);

  it("annotates primitive types", async () => {
    const src = `function fn(a, b) {return a + b};`;
    const expected = `function fn(a: string, b: string) {return a + b};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "string"}');
    expect(await transform(src)).toBe(expected);
  });

  it("annotates union types", async () => {
    const src = `function fn(a) {return a};`;
    const expected = `function fn(a: string | number) {return a};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "string | number"}');
    expect(await transform(src)).toBe(expected);
  });

  it("does not annotate empty", async () => {
    const src = `function fn(a) {return a};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": ""}');
    expect(await transform(src)).toBe(src);
  });

  it("does not annotate unknown", async () => {
    const src = `function fn(a) {return a};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "unknown"}');
    expect(await transform(src)).toBe(src);
  });

  it("does not annotate implicit unknown", async () => {
    const src = `function fn(a) {return a};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue(
      '{"type": "unknown(implicit)"}'
    );
    expect(await transform(src)).toBe(src);
  });

  it("does not annotate explicit unknown", async () => {
    const src = `function fn(a) {return a};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue(
      '{"type": "unknown(explicit)"}'
    );
    expect(await transform(src)).toBe(src);
  });

  it("does not annotate any", async () => {
    const src = `function fn(a) {return a};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "any"}');
    expect(await transform(src)).toBe(src);
  });

  it("does not annotate implicit any", async () => {
    const src = `function fn(a) {return a};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "any(implicit)"}');
    expect(await transform(src)).toBe(src);
  });

  it("annotates explicit any", async () => {
    const src = `function fn(a) {return a};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "any(explicit)"}');
    const expected = `function fn(a: any) {return a};`;
    expect(await transform(src)).toBe(expected);
  });

  it("does not annotate unions with any", async () => {
    const src = `function fn(a) {return a};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "string | any"}');
    expect(await transform(src)).toBe(src);
  });

  it("converts utility types", async () => {
    const src = `function fn(a) {return a};`;
    const expected = `function fn(a: Partial<Foo>) {return a};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "$Shape<Foo>"}');
    expect(await transform(src)).toBe(expected);
  });

  it("pre-processes private types", async () => {
    const src = `function fn(a) {return a};`;
    const expected = `function fn(a: React.ReactNode) {return a};`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "React$Node"}');
    expect(await transform(src)).toBe(expected);
  });

  it("handles empty", async () => {
    const src = dedent`const PageWrapper = (page) => {
      return Wrap(page, PricePage);
    };`;
    const expected = dedent`const PageWrapper = (page: any) => {
      return Wrap(page, PricePage);
    };`;
    mockedExecuteFlowTypeAtPos.mockResolvedValue('{"type": "empty"}');
    expect(await transform(src)).toBe(expected);
  });

  it("handles flow errors", async () => {
    const src = dedent`function fn(a) {
      type Foo = $Shape<Test>;
      return a;
    };`;
    const expected = dedent`function fn(a) {
      type Foo = Partial<Test>;
      return a;
    };`;
    mockedExecuteFlowTypeAtPos.mockRejectedValue("Command failed");
    expect(await transform(src)).toBe(expected);
  });
});
