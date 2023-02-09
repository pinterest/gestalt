import dedent from "dedent";
import { FlowCommentRegex } from "./process-batch";

const code = dedent`
const t = 5;
console.log('hi')
`;

const remove = (s: string) => {
  const joined = s + code;
  return joined.replace(FlowCommentRegex, "");
};

describe("Test flow comment removal", () => {
  it("removes basic", () => {
    expect(remove("// @flow\n")).toBe(code);
  });

  it("does not remove missing @", () => {
    const src = "// flow\n";
    expect(remove(src)).toBe(src + code);
  });

  it("removes double", () => {
    expect(remove("// // @flow\n")).toBe(code);
  });

  it("removes triple", () => {
    expect(remove("// // // @flow\n")).toBe(code);
  });

  it("removes ignoring spaces", () => {
    expect(remove("/// // @flow\n")).toBe(code);
  });
});
