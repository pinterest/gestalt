import { ts } from "ts-morph";
import MigrationReporter from "../../runner/migration-reporter";
import { stdOutFormatter } from "../../runner/migration-reporter/formatters/std-out-formatter";
import { buildDiagnosticFilter } from "../build-diagnostic-message-filter";
import { getImportNamed } from "../get-import-named";
import { getParentUntil } from "../ts-node-traversal";
import { jsonFormatter } from "../../runner/migration-reporter/formatters/json-formatter";
import { logger } from "../../runner/logger";
import { FixCommandState, getDiagnostics } from "../state";

export async function componentPropChecks({
  argv,
  migrationReporter,
  project,
}: FixCommandState) {
  logger.info("Checking Component Props");

  const diagnostics = getDiagnostics(project);
  const TARGETED_ERROR_MESSAGE = "does not exist";
  const diagnosticFilter = buildDiagnosticFilter(TARGETED_ERROR_MESSAGE);

  diagnostics.filter(diagnosticFilter).forEach((error) => {
    const sourceFile = error.getSourceFile();
    const myStart = error.getStart();

    if (!sourceFile || !myStart) {
      return;
    }

    const descendant = sourceFile.getDescendantAtPos(myStart);

    const attribute = getParentUntil(descendant, ts.isJsxAttribute);
    if (!attribute) {
      return;
    }
    const attributeName = String(attribute.compilerNode.name.escapedText);

    const component = getParentUntil(attribute, ts.isJsxOpeningElement);
    if (!component) {
      return;
    }

    const tagName = component.compilerNode.tagName.getFullText();

    if (tagName.charAt(0) === tagName.charAt(0).toLowerCase()) {
      migrationReporter.invalidHTMLProp(
        sourceFile.getFilePath(),
        error.getLineNumber() ?? 0,
        tagName,
        attributeName
      );
      return;
    }

    const theImport = getImportNamed(sourceFile, tagName);

    if (!theImport) {
      return;
    }

    const importSourceFile = theImport.getModuleSpecifierSourceFile();

    if (!importSourceFile) {
      logger.warn("Import source file not found for import");
      return;
    }

    if (importSourceFile.isInNodeModules()) {
      migrationReporter.invalidLibraryProp(
        sourceFile.getFilePath(),
        error.getLineNumber() ?? 0,
        importSourceFile.getDirectoryPath(),
        tagName,
        attributeName
      );
    } else {
      migrationReporter.invalidAppProp(
        sourceFile.getFilePath(),
        error.getLineNumber() ?? 0,
        importSourceFile?.getFilePath(),
        tagName,
        attributeName
      );
    }
  });

  const formatter =
    argv.format === "json" ? jsonFormatter(argv.output) : stdOutFormatter;
  await MigrationReporter.logReport(
    migrationReporter.generateReport(),
    formatter
  );
}
