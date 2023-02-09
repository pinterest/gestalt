import {
  transform,
  expectMigrationReporterMethodCalled,
  expectMigrationReporterMethodNotCalled,
} from "./utils/testing";

jest.mock("../runner/migration-reporter/migration-reporter.ts");

describe("transforms JSX", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("escapes greater than symbols", async () => {
    const src = `const Text = <div>Greater (>1000)</div>`;
    const expected = `const Text = <div>Greater ({'>'}1000)</div>`;
    expect(await transform(src)).toBe(expected);
    expectMigrationReporterMethodCalled("unescapedGreaterThan");
  });
  it("does not escape normal strings", async () => {
    const src = `const text = "Greater (>1000)"`;
    expect(await transform(src)).toBe(src);
    expectMigrationReporterMethodNotCalled("unescapedGreaterThan");
  });
  it("does not escape already escaped", async () => {
    const src = `const Text = <div>Greater ({'>'}1000)</div>`;
    expect(await transform(src)).toBe(src);
    expectMigrationReporterMethodNotCalled("unescapedGreaterThan");
  });
  it("does not escape gt", async () => {
    const src = `const Text = <div>test &lt;host-type&gt;.test.com</div>`;
    expect(await transform(src)).toBe(src);
    expectMigrationReporterMethodNotCalled("unescapedGreaterThan");
  });
  it("escapes multiple symbols", async () => {
    const src = `const Text = <div>Greater(>) Greater(>)</div>`;
    const expected = `const Text = <div>Greater({'>'}) Greater({'>'})</div>`;
    expect(await transform(src)).toBe(expected);
    expectMigrationReporterMethodCalled("unescapedGreaterThan");
  });
});
