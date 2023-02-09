import { fixTypeExports } from "..";
import {
  expectMigrationReporterMethodCalled,
  createOutputRecorder,
  getTestFixState,
} from "../../../convert/utils/testing";

jest.mock("../../../runner/migration-reporter");
jest.mock("../../../runner/logger");

describe("fixTypeExports", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fixes mismatched type imports and exports", async () => {
    const [results, recordTestResult] = createOutputRecorder();

    await fixTypeExports(
      getTestFixState({
        tsProps: false,
        autoSuppressErrors: false,
        generateReport: false,
        jiraSlug: "",
        useIgnore: false,
        removeUnused: false,
        config: "./src/fix/fix-type-exports/__test__/tsconfig.json",
        format: "stdout",
        silent: false,
        output: "",
        autoImport: false,
        fixTypeExports: false,
      }),
      recordTestResult
    );

    expectMigrationReporterMethodCalled(`typeExports`);

    expect(results["test-input.ts"]).toMatchSnapshot();
  });
});
