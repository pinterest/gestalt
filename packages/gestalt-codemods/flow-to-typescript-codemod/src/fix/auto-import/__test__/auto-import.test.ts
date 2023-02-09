import { autoImport } from "..";
import {
  expectMigrationReporterMethodCalled,
  getTestFixState,
} from "../../../convert/utils/testing";

jest.mock("../../../runner/migration-reporter");
jest.mock("../../../runner/logger");

describe("autoImport", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("automatically imports types that are not currently imported", async () => {
    await autoImport(
      getTestFixState({
        tsProps: false,
        autoSuppressErrors: false,
        generateReport: false,
        jiraSlug: "",
        useIgnore: false,
        removeUnused: false,
        config: "./src/fix/auto-import/__test__/tsconfig.json",
        format: "stdout",
        silent: false,
        output: "",
        autoImport: false,
        fixTypeExports: false,
      }),
      false
    );

    expectMigrationReporterMethodCalled(`autoImport`);
  });
});
