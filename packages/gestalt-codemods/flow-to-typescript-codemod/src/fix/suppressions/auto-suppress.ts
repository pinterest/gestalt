import { Diagnostic, Project, SourceFile, ts } from "ts-morph";
import { FixCommandState, getDiagnostics } from "../state";
import { FixCommandCliArgs } from "../../cli/arguments";
import { logger } from "../../runner/logger";
import { isDiagnosticSuppressible } from "../insuppressible-errors";
import { diagnosticToDescription } from "./diagnostic-to-description";
import { CommentToMake, CommentType } from "./shared";

interface Metrics {
  suppressed: number;
}

function makeComment({
  commentType,
  jiraSlug,
  diagnostics,
  annotation = "@ts-expect-error",
}: {
  commentType: CommentType;
  jiraSlug: string;
  diagnostics: Diagnostic[];
  annotation?: string;
}): string {
  // If jira slug was not specified, don't include anything
  const fullJiraSlug = jiraSlug === "" ? "" : ` [${jiraSlug}]`;

  const commentText = `${annotation}${fullJiraSlug} - ${diagnostics
    .map((diagnostic) => diagnosticToDescription(diagnostic))
    .join(" | ")}`;

  if (commentType === CommentType.Jsx) {
    return `{ /* ${commentText} */}\n`;
  }
  return `// ${commentText}\n`;
}

/**
 * Add suppression comments for errors in the file
 */
function addSuppressionsInFile(
  metrics: Metrics,
  positions: Record<number, CommentToMake>,
  sourceFile: SourceFile,
  project: Project,
  { jiraSlug, useIgnore }: FixCommandCliArgs
) {
  let addedLength = 0;
  for (const { position, commentType, diagnostics } of Object.values(
    positions
  )) {
    const isInsuppressible = diagnostics.find((error) => {
      const isInsuppressible = !isDiagnosticSuppressible(error);
      if (isInsuppressible) {
        logger.error(
          `Found an insuppressible error. Please fix manually:
            ${project.formatDiagnosticsWithColorAndContext([error])}`
        );
      }
      return isInsuppressible;
    });
    if (!isInsuppressible) {
      const comment = makeComment({
        commentType,
        diagnostics,
        jiraSlug,
        annotation: useIgnore ? "@ts-ignore" : "@ts-expect-error",
      });
      const insertPos = position + addedLength;
      sourceFile.insertText(insertPos, comment);
      addedLength += comment.length;
      metrics.suppressed += 1;
    }
  }
}

type FileWriter = (file: SourceFile) => void;
const defaultWriter = (file: SourceFile) => file.saveSync();

export async function autoSuppressErrors(
  { argv, project }: FixCommandState,
  writeFile: FileWriter = defaultWriter
) {
  const diagnosticsByFile: Map<
    SourceFile,
    Record<number, CommentToMake>
  > = new Map();
  logger.info("Suppressing errors..");
  const diagnostics = getDiagnostics(project);

  diagnostics.forEach((error) => {
    const sourceFile = error.getSourceFile();

    if (!sourceFile) {
      return;
    }

    const errorStart = error.getStart();
    if (!errorStart) {
      return;
    }

    const node = sourceFile.getDescendantAtPos(errorStart);
    const errorStartLine = node?.getStartLinePos(true);
    if (errorStartLine == null) {
      return;
    }

    // Find out which comment we should make
    const errorLine = sourceFile.getDescendantAtPos(errorStartLine);
    const commentsForFile = diagnosticsByFile.get(sourceFile) ?? {};
    const commentsForLine = commentsForFile[errorStartLine] ?? {
      position: errorStartLine,
      commentType: [
        ts.SyntaxKind.JsxElement,
        ts.SyntaxKind.JsxFragment,
        ts.SyntaxKind.JsxExpression,
        ts.SyntaxKind.JsxClosingElement,
      ].some((elementType) => errorLine?.getParentIfKind(elementType) != null)
        ? CommentType.Jsx
        : CommentType.Standard,
      diagnostics: [],
    };

    commentsForLine.diagnostics.push(error);
    commentsForFile[errorStartLine] = commentsForLine;
    diagnosticsByFile.set(sourceFile, commentsForFile);
  });

  const metrics: Metrics = {
    suppressed: 0,
  };

  for (const [sourceFile, positions] of diagnosticsByFile) {
    addSuppressionsInFile(metrics, positions, sourceFile, project, argv);

    try {
      writeFile(sourceFile);
    } catch (e) {
      logger.warn(
        `Error when saving suppressed source file. Ensure that node_modules is not being type checked by your TSConfig. Error: ${e}.`
      );
    }
  }

  logger.complete(
    `Suppressed ${metrics.suppressed} errors across ${diagnosticsByFile.size} files.`
  );
}
