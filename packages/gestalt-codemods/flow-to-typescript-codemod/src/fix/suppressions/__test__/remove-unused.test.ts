import { removeUnusedErrors } from "../remove-unused";
import { autoSuppressErrors } from "../auto-suppress";
import {
  createOutputRecorder,
  getTestFixState,
} from "../../../convert/utils/testing";

jest.mock("../../../runner/migration-reporter");
jest.mock("../../../runner/logger");

describe("removeUnused", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("removes unused error suppressions", async () => {
    const [results, recordTestResult] = createOutputRecorder();

    await removeUnusedErrors(
      getTestFixState({
        tsProps: false,
        autoSuppressErrors: false,
        generateReport: false,
        jiraSlug: "",
        useIgnore: false,
        removeUnused: false,
        config: "./src/fix/suppressions/__test__/tsconfig.json",
        format: "stdout",
        silent: false,
        output: "",
        autoImport: false,
        fixTypeExports: false,
      }),
      recordTestResult
    );

    expect(results["test-input.ts"]).toMatchSnapshot();
  });

  it("does not remove if run twice", async () => {
    const [results, recordTestResult] = createOutputRecorder();
    const state = getTestFixState({
      tsProps: false,
      autoSuppressErrors: false,
      generateReport: false,
      jiraSlug: "",
      useIgnore: false,
      removeUnused: false,
      config: "./src/fix/suppressions/__test__/tsconfig.json",
      format: "stdout",
      silent: false,
      output: "",
      autoImport: false,
      fixTypeExports: false,
    });

    await removeUnusedErrors(state, recordTestResult);
    await removeUnusedErrors(state, recordTestResult);

    expect(results["test-input.ts"]).toMatchSnapshot();
  });

  it("works with autoSuppress", async () => {
    const [results, recordTestResult] = createOutputRecorder();
    const state = getTestFixState({
      tsProps: false,
      autoSuppressErrors: false,
      generateReport: false,
      jiraSlug: "",
      useIgnore: false,
      removeUnused: false,
      config: "./src/fix/suppressions/__test__/tsconfig.json",
      format: "stdout",
      silent: false,
      output: "",
      autoImport: false,
      fixTypeExports: false,
    });

    await autoSuppressErrors(state, recordTestResult);
    await removeUnusedErrors(state, recordTestResult);

    expect(results["test-input.ts"]).toMatchSnapshot();
  });
});
