import { SourceFile } from "ts-morph";
import MigrationReporter from "../../runner/migration-reporter";
import { stdOutFormatter } from "../../runner/migration-reporter/formatters/std-out-formatter";
import { jsonFormatter } from "../../runner/migration-reporter/formatters/json-formatter";
import { logger } from "../../runner/logger";
import { FixCommandState, getDiagnostics } from "../state";

/**
 * Use the TypeScript compiler's auto-import feature to try to fix missing imports.
 * Warning: this can be slow in large codebases.
 */
export async function autoImport(
  { argv, migrationReporter, project }: FixCommandState,
  write = true
) {
  logger.info(`Finding files with potential import errors.`);
  const diagnostics = getDiagnostics(project);
  const sourceFileMap = diagnostics
    .filter((diagnostic) => diagnostic.getCode() === 2304)
    .reduce((sourceFileMap, error) => {
      const sourceFile = error.getSourceFile();
      if (!sourceFile || sourceFileMap.has(sourceFile.getFilePath())) {
        return sourceFileMap;
      }

      return sourceFileMap.set(sourceFile.getFilePath(), sourceFile);
    }, new Map<string, SourceFile>());

  logger.info(
    `Attempting to fix import errors with auto-import. This may take a while..`
  );
  sourceFileMap.forEach((sourceFile) => {
    migrationReporter.autoImport(sourceFile.getFilePath());
    sourceFile.fixMissingImports();
    try {
      if (write) {
        sourceFile.saveSync();
      }
    } catch (e) {
      logger.warn(
        `Error when saving suppressed source file. Ensure that node_modules is not being type checked by your TSConfig. Error: ${e}.`
      );
    }
  });

  logger.info(`Done auto-import.`);

  const formatter =
    argv.format === "json" ? jsonFormatter(argv.output) : stdOutFormatter;
  await MigrationReporter.logReport(
    migrationReporter.generateReport(),
    formatter
  );
}
