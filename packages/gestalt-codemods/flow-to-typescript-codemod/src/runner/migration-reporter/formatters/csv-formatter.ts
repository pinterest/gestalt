import * as fs from "fs";
import { relative } from "path";
import { stringify } from "csv-stringify/sync";
import { MigrationReport, MigrationReportItem } from "../migration-reporter";

const severityMap = { error: 0, warn: 1, info: 2 } as const;

const compare = (first: MigrationReportItem, second: MigrationReportItem) => {
  if (first.severity !== second.severity) {
    return severityMap[first.severity] - severityMap[second.severity];
  }

  if (first.type < second.type) {
    return -1;
  }
  if (first.type > second.type) {
    return 1;
  }
  return 0;
};

export function csvFormatter(filePath: string) {
  return (report: MigrationReport) => {
    const table = [["Type", "Severity", "Message", "Path"]];

    const items = report.migrationReportItems.sort(compare);

    for (const item of items) {
      const pathText = `${relative(process.cwd(), item.filePath)}:${
        item.start.line
      }:${item.start.column}`;
      table.push([item.type, item.severity, item.message, pathText]);
    }

    return fs.promises.writeFile(
      relative(process.cwd(), filePath),
      stringify(table)
    );
  };
}
