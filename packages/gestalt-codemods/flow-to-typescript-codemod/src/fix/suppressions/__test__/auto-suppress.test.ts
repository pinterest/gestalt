import { autoSuppressErrors } from "../auto-suppress";
import {
  createOutputRecorder,
  getTestFixState,
} from "../../../convert/utils/testing";

jest.mock("../../../runner/migration-reporter");
jest.mock("../../../runner/logger");

describe("autoSuppressErrors", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("adds suppressions to suppressable errors", async () => {
    const [results, recordTestResult] = createOutputRecorder();

    await autoSuppressErrors(
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

  it("does not add if run twice", async () => {
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

    await autoSuppressErrors(state, recordTestResult);

    expect(results["test-input.ts"]).toMatchSnapshot();
  });
});
