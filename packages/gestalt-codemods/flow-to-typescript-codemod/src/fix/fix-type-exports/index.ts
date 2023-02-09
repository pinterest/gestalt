import type { Node } from "ts-morph";
import { SourceFile, ts, ExportDeclaration } from "ts-morph";
import MigrationReporter from "../../runner/migration-reporter";
import { getParentUntil } from "../ts-node-traversal";
import { jsonFormatter } from "../../runner/migration-reporter/formatters/json-formatter";
import { logger } from "../../runner/logger";
import { stdOutFormatter } from "../../runner/migration-reporter/formatters/std-out-formatter";
import { FixCommandState, getDiagnostics } from "../state";

const REEXPORTED_TYPE_ERROR = 1205; // See: https://www.typescriptlang.org/tsconfig#isolatedModules

function extractTypeOnlyExports(
  sourceFile: SourceFile,
  exportNode: ExportDeclaration,
  typeOnlyIdentifiers: string[]
) {
  const structure = exportNode.getStructure();

  const extractedTypeOnlyExports = [];

  // Remove any type-only identifiers from this export statement:
  for (const namedExport of exportNode.getNamedExports()) {
    if (typeOnlyIdentifiers.includes(namedExport.getName())) {
      extractedTypeOnlyExports.push(namedExport.getStructure());
      namedExport.remove();
    }
  }

  // If we removed all identifiers from this export declaration without removing
  // the declaration itself, remove it (rather than leaving 'import * from "…";'):
  if (!exportNode.wasForgotten() && !exportNode.hasNamedExports()) {
    exportNode.remove();
  }

  // Add new type-only export for this group of identifiers:
  // TODO: Should insert directly after original export (instead of EOF).
  sourceFile.addExportDeclaration({
    isTypeOnly: true,
    namedExports: extractedTypeOnlyExports,
    moduleSpecifier: structure.moduleSpecifier,
  });
}

function fixTypeOnlyExports(sourceFile: SourceFile, identifiers: Node[]) {
  const identifiersByExport = identifiers.reduce((exportMap, node: Node) => {
    const exportNode = getParentUntil(
      node,
      ts.isExportDeclaration
    ) as ExportDeclaration;
    if (exportNode) {
      const identifiers = exportMap.get(exportNode) || [];
      exportMap.set(exportNode, [...identifiers, node]);
    }
    return exportMap;
  }, new Map<ExportDeclaration, Node[]>());

  for (const [exportNode, identifiers] of identifiersByExport.entries()) {
    const typeOnlyIdentifiers = identifiers.map((id) => id.getText());
    const containsAllTypeOnlyExports = exportNode
      .getNamedExports()
      .map((namedExport) => namedExport.getName())
      .every((name) => typeOnlyIdentifiers.includes(name));

    if (containsAllTypeOnlyExports) {
      exportNode.setIsTypeOnly(true);
    } else {
      extractTypeOnlyExports(sourceFile, exportNode, typeOnlyIdentifiers);
    }
  }
}

type FileWriter = (file: SourceFile) => void;
const defaultWriter = (file: SourceFile) => file.saveSync();

export async function fixTypeExports(
  { argv, migrationReporter, project }: FixCommandState,
  writeFile: FileWriter = defaultWriter
) {
  logger.info("Checking TypeScript export types");
  logger.warn(`[Experimental] This transformation is experimental.`);

  const initialDiagnostics = getDiagnostics(project);

  const diagnostics = initialDiagnostics.filter(
    (diagnostic) => diagnostic.getCode() === REEXPORTED_TYPE_ERROR
  );

  logger.info(`${diagnostics.length} type-export diagnostics received.`);

  const invalidTypeExportIdentifiersByFile = diagnostics.reduce(
    (sourceFileMap, error) => {
      const sourceFile = error.getSourceFile();
      const location = error.getStart();
      if (!sourceFile || !location) {
        return sourceFileMap;
      }

      const node = sourceFile.getDescendantAtPos(location);
      if (node) {
        const nodes = sourceFileMap.get(sourceFile) || [];
        sourceFileMap.set(sourceFile, [...nodes, node]);
      }

      return sourceFileMap;
    },
    new Map<SourceFile, Node[]>()
  );

  logger.info(`Fixing mismatched type exports.`);

  invalidTypeExportIdentifiersByFile.forEach((nodes, sourceFile) => {
    for (const node of nodes) {
      migrationReporter.typeExports(
        sourceFile.getFilePath(),
        node.getStartLineNumber()
      );
    }

    fixTypeOnlyExports(sourceFile, nodes);

    try {
      writeFile(sourceFile);
    } catch (e) {
      logger.warn(
        `Error when saving suppressed source file. Ensure that node_modules is not being type checked by your TSConfig. Error: ${e}.`
      );
    }
  });

  logger.info(`Done fixing type exports.`);

  await MigrationReporter.logReport(
    migrationReporter.generateReport(),
    argv.format === "json" ? jsonFormatter(argv.output) : stdOutFormatter
  );
}
