import MigrationReporter from ".";

describe("MigrationReporter", () => {
  describe("merge  reports", () => {
    it("should merge reports as expected", () => {
      const firstReport = new MigrationReporter();
      const secondReport = new MigrationReporter();

      firstReport.objectPropertyWithInternalName("test", {
        start: { column: 1, line: 1 },
        end: { column: 2, line: 2 },
      });
      firstReport.objectPropertyWithMinusVariance("test", {
        start: { column: 2, line: 2 },
        end: { column: 5, line: 5 },
      });
      secondReport.objectPropertyWithInternalName("test", {
        start: { column: 2, line: 3 },
        end: { column: 4, line: 5 },
      });
      secondReport.unsupportedTypeCast("test", {
        start: { column: 9, line: 9 },
        end: { column: 9, line: 9 },
      });
      secondReport.unsupportedComponentProp("test", {
        start: { column: 11, line: 11 },
        end: { column: 11, line: 11 },
      });

      const mergedReports = MigrationReporter.mergeReports([
        firstReport.generateReport(),
        secondReport.generateReport(),
      ]);

      expect(mergedReports.migrationReportItems).toEqual([
        {
          filePath: "test",
          type: "objectPropertyWithInternalName",
          message:
            "Encountered an object property using the Flow internal naming format ({ $Key: string }). This pattern is not supported in TypeScript and should be updated.",
          severity: "warn",
          start: { column: 1, line: 1 },
          end: { column: 2, line: 2 },
        },
        {
          filePath: "test",
          type: "objectPropertyWithMinusVariance",
          message:
            "Encountered an object property using Flow type variance ({ key: -string }) that cannot be cleanly converted.",
          severity: "warn",
          start: { column: 2, line: 2 },
          end: { column: 5, line: 5 },
        },
        {
          filePath: "test",
          type: "objectPropertyWithInternalName",
          message:
            "Encountered an object property using the Flow internal naming format ({ $Key: string }). This pattern is not supported in TypeScript and should be updated.",
          severity: "warn",
          start: { column: 2, line: 3 },
          end: { column: 4, line: 5 },
        },
        {
          filePath: "test",
          type: "unsupportedTypeCast",
          message: "Encountered an unsupported type cast",

          severity: "info",
          start: { column: 9, line: 9 },
          end: { column: 9, line: 9 },
        },
        {
          filePath: "test",
          type: "unsupportedComponentProp",
          message: "Unsupported prop supplied to this component.",
          severity: "warn",
          start: { column: 11, line: 11 },
          end: { column: 11, line: 11 },
        },
      ]);
    });
  });
});
