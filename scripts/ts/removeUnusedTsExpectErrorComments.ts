import fs from 'fs';

const TS_EXPECT_ERROR_REMOVED = '__TS_EXPECT_ERROR_REMOVED__'; // special string to mark the line as removed

type FilePathToLineNumbers = {
  [filePath: string]: ReadonlyArray<number>;
};

function getUnusedTsExpectErrorComments(tscRunOutputFilePath: string): FilePathToLineNumbers {
  const filePathToLineNumbers: FilePathToLineNumbers = {};
  fs.readFileSync(tscRunOutputFilePath, { encoding: 'utf8' })
    .split('\n')
    .filter((line) => line.includes(": error TS2578: Unused '@ts-expect-error' directive."))
    .map((line) => (line.split(':')[0] || '').match(/^(.*)\((\d+),/))
    .forEach((matches) => {
      if (matches) {
        const [_, filePath, lineNum] = matches;
        filePathToLineNumbers[filePath] = [
          ...(filePathToLineNumbers[filePath] || []),
          parseInt(lineNum, 10),
        ];
      }
    });
  return filePathToLineNumbers;
}

async function removeTsExpectErrorCommentsForFile(
  filePath: string,
  lineNums: ReadonlyArray<number>,
): Promise<void> {
  const content = await fs.promises.readFile(filePath, 'utf8');
  await fs.promises.writeFile(
    filePath,
    content
      .split(/\n/)
      .map((line, index) => {
        if (!lineNums.includes(index + 1)) {
          return line;
        }
        // Almost all @ts-expect-error comments are in their own lines, but that isn't always
        // the case. In some rare cases, a @ts-expect-error comment can be at the end of a line
        // that is above the line with the error, and we want to make sure that we do not remove
        // the code before the @ts-expect-error comment.
        const inlineTsExpectErrorCommentMatch = line.match(/^(.*)\s\/\/\s@ts-expect-error/);
        if (inlineTsExpectErrorCommentMatch && inlineTsExpectErrorCommentMatch[1].trim() !== '') {
          return inlineTsExpectErrorCommentMatch[1];
        }
        return TS_EXPECT_ERROR_REMOVED;
      })
      .filter((line) => line !== TS_EXPECT_ERROR_REMOVED)
      .join('\n'),
  );
}

async function removeUnusedTsExpectErrorComments(tscRunOutputFilePath: string) {
  await Promise.all(
    Object.entries(getUnusedTsExpectErrorComments(tscRunOutputFilePath)).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ([filePath, lineNums]: [any, any]) => removeTsExpectErrorCommentsForFile(filePath, lineNums),
    ),
  );
}

const tscRunOutputFilePath = process.argv[2];

if (!tscRunOutputFilePath) {
  throw new Error('Please provide the path to the tsc run output file');
}

removeUnusedTsExpectErrorComments(tscRunOutputFilePath);
