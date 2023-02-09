import * as fs from "fs";
import { stringify } from "csv-stringify/sync";
import { relative } from "path";
import { logger } from "../../runner/logger";
import { isDiagnosticSuppressible } from "../insuppressible-errors";
import { FixCommandState, getDiagnostics } from "../state";

export type ReportRow = [
  code: string,
  message: string,
  source: string,
  path: string,
  suppressible: string
];

export const compare = (first: ReportRow, second: ReportRow) => {
  const firstCode = parseInt(first[0], 10);
  const secondCode = parseInt(second[0], 10);
  if (firstCode === secondCode) {
    if (first[3] < second[3]) {
      return -1;
    }
    if (first[3] > second[3]) {
      return 1;
    }
    return 0;
  }

  return firstCode - secondCode;
};

export function generateReport({ argv, project }: FixCommandState) {
  const outputFile = relative(
    process.cwd(),
    argv.output || `migration-report.csv`
  );
  logger.info(`Generating error report to ${outputFile}`);
  const table: Array<ReportRow> = [];

  const diagnostics = getDiagnostics(project);

  diagnostics.forEach((error) => {
    const sourceFile = error.getSourceFile();
    const errorLineNumber = error.getLineNumber();

    if (!sourceFile || !errorLineNumber) {
      return;
    }
    // Get the source code for the line with the error
    const errorSource = sourceFile.getFullText().split(`\n`)[
      errorLineNumber - 1
    ];
    const filePath = sourceFile.compilerNode.fileName;
    const pathText = `${relative(process.cwd(), filePath)}:${errorLineNumber}`;

    const messageNode = error.getMessageText();
    if (typeof messageNode === "string") {
      table.push([
        error.getCode().toString(),
        messageNode,
        errorSource,
        pathText,
        String(isDiagnosticSuppressible(error)),
      ]);
    } else {
      // The message can be a DiagnosticMessageChain object instead of a string
      table.push([
        error.getCode().toString(),
        messageNode.getMessageText(),
        errorSource,
        pathText,
        String(isDiagnosticSuppressible(error)),
      ]);
    }
  });

  const report = table.sort(compare);
  report.unshift([
    "Error Code",
    "Message",
    "Source",
    "File Path",
    "Suppressible",
  ]);

  return fs.promises.writeFile(outputFile, stringify(report));
}
