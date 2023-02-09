import childProcess from "child_process";
import * as t from "@babel/types";

/**
 * Actually executes `flow type-at-pos`. This will be called behind a throttle.
 */
export async function executeFlowTypeAtPos(
  filePath: string,
  location: t.SourceLocation
): Promise<string> {
  const { line, column } = location.start;
  const command = `$(yarn bin)/flow type-at-pos "${filePath}" ${line} ${
    column + 1
  } --json --from "typescriptify" --quiet`;

  // Actually run Flow...
  const stdout = await new Promise<string>((resolve, reject) => {
    childProcess.exec(command, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
  return stdout;
}
