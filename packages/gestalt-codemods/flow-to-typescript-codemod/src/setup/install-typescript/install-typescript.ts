// Install the appropriate TypeScript in the current directory.
import path from "path";
import { exec } from "child_process";
import { existsSync } from "fs";
import { logger } from "../../runner/logger";

/**
 * Install a fixed version of typescript
 */
export function installTypescript() {
  return new Promise((resolve, reject) => {
    if (!existsSync(path.join(process.cwd(), "package.json"))) {
      throw new Error("Must run this in a directory with a package.json");
    }

    exec("yarn add --dev typescript@4.6.4", (err, stdout) => {
      if (err) {
        logger.error("Real Err:", err);
        return reject(err);
      }

      resolve(stdout);
    });
  });
}
