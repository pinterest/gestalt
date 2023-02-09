import { transform } from "./utils/testing";

describe("transform patterns", () => {
  it("converts function assigned parameters", async () => {
    const src = `function f(x?: T = y){};`;
    const expected = `function f(x: T = y){};`;
    expect(await transform(src)).toBe(expected);
  });
});
