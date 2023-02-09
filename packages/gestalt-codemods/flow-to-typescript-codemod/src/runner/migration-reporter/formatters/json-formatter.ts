import * as fs from "fs";
import { relative } from "path";
import { MigrationReport } from "..";

export function jsonFormatter(filePath: string) {
  return (report: MigrationReport) => {
    return fs.promises.writeFile(
      relative(process.cwd(), filePath),
      JSON.stringify(report)
    );
  };
}
