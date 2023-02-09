import { compare, ReportRow } from ".";

describe("Report Generator", () => {
  describe("sorts reports", () => {
    it("should sort reports by code and path", () => {
      const table: Array<ReportRow> = [
        ["4", "invalid", "source", "/src/a.js", "true"],
        ["3", "invalid", "source", "/src/a.js", "true"],
        ["3", "invalid", "source", "/src/d.js", "true"],
        ["3", "invalid", "source", "/src/c.js", "true"],
        ["2", "invalid", "source", "/src/b.js", "true"],
      ];

      const report = table.sort(compare);

      expect(report).toStrictEqual([
        ["2", "invalid", "source", "/src/b.js", "true"],
        ["3", "invalid", "source", "/src/a.js", "true"],
        ["3", "invalid", "source", "/src/c.js", "true"],
        ["3", "invalid", "source", "/src/d.js", "true"],
        ["4", "invalid", "source", "/src/a.js", "true"],
      ]);
    });
  });
});
