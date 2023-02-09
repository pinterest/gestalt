import { SourceFile, ts } from "ts-morph";
import { FixCommandState, getDiagnostics } from "../state";
import { logger } from "../../runner/logger";
import { CommentToMake, CommentType } from "./shared";

interface Metrics {
  removed: number;
}

// See https://github.com/microsoft/TypeScript/blob/e9453f411a3599d811e043390a167c40866e9630/src/compiler/diagnosticMessages.json
const TYPESCRIPT_UNUSED_EXPECT_ERROR_CODE = 2578;

/**
 * Remove suppression comments for unused expect errors in the file
 */
function removeUnusedInFile(
  metrics: Metrics,
  positions: Record<number, CommentToMake>,
  sourceFile: SourceFile
) {
  let addedLength = 0;
  for (const { commentType, diagnostics } of Object.values(positions)) {
    const unusedExpectError = diagnostics.find(
      (error) => error.getCode() === TYPESCRIPT_UNUSED_EXPECT_ERROR_CODE
    );
    if (unusedExpectError !== undefined) {
      const start = unusedExpectError.getStart();
      const length = unusedExpectError.getLength();
      if (start !== undefined && length !== undefined) {
        const insertPos = start + addedLength;
        try {
          if (commentType === CommentType.Jsx) {
            // JSX comments have curly braces on either side that we want to delete
            sourceFile.replaceText([insertPos - 2, insertPos + length + 2], "");
            addedLength -= length + 4;
          } else {
            sourceFile.replaceText([insertPos, insertPos + length], "");
            addedLength -= length;
          }
          metrics.removed += 1;
        } catch (error) {
          logger.error(`Error when trying to remove suppressions at pos:${
            start + addedLength
          } in ${sourceFile.getFilePath()}.
			      This often indicates syntax errors. This file will be skipped.`);

          // Break out of removing comments for this file
          return addedLength;
        }
      }
    }
  }
}

type FileWriter = (file: SourceFile) => void;
const defaultWriter = (file: SourceFile) => file.saveSync();

export async function removeUnusedErrors(
  { project }: FixCommandState,
  writeFile: FileWriter = defaultWriter
) {
  const diagnosticsByFile: Map<
    SourceFile,
    Record<number, CommentToMake>
  > = new Map();
  logger.info("Removing unused suppressions..");

  const diagnostics = getDiagnostics(project);
  diagnostics.forEach((error) => {
    const sourceFile = error.getSourceFile();

    if (!sourceFile) {
      return;
    }

    const errorStart = error.getStart();
    if (errorStart === undefined) {
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
    removed: 0,
  };

  for (const [sourceFile, positions] of diagnosticsByFile) {
    removeUnusedInFile(metrics, positions, sourceFile);

    try {
      writeFile(sourceFile);
    } catch (e) {
      logger.warn(
        `Error when saving suppressed source file. Ensure that node_modules is not being type checked by your TSConfig. Error: ${e}.`
      );
    }
  }

  logger.complete(
    `Removed ${metrics.removed} errors across ${diagnosticsByFile.size} files.`
  );
}
