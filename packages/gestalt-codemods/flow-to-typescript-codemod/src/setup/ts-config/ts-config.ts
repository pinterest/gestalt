// Copy a sample default TsConfig to the current directory

import { existsSync, lstatSync, writeFileSync } from "fs";
import { join, relative, resolve } from "path";

const ROOT_TSCONFIG_NAME = "tsconfig.json";

/**
 * Starting in this directory, look up the directory tree until you find a tsconfig.json (unless you reach the top level directory).
 */
function findRootTSConfig(directory = process.cwd()): string {
  if (existsSync(join(directory, ROOT_TSCONFIG_NAME))) {
    return join(directory, ROOT_TSCONFIG_NAME);
  }

  if (resolve(directory) === "/") {
    throw new Error("No root Typescript configuration found.");
  }

  return findRootTSConfig(join(directory, ".."));
}

export function defaultTsConfig(conversionPath: string) {
  const rootTSConfig = findRootTSConfig();

  const rootConfig: Record<string, unknown> = {
    extends: relative(process.cwd(), rootTSConfig),
  };

  if (lstatSync(conversionPath).isDirectory()) {
    rootConfig.compilerOptions = {
      baseUrl: conversionPath,
    };
  }

  writeFileSync(
    join(process.cwd(), "tsconfig.json"),
    JSON.stringify(rootConfig, null, 2)
  );
}
