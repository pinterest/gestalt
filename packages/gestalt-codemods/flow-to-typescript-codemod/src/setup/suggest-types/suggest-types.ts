import { exec } from "child_process";
import fs from "fs";
import path from "path";
import MigrationReporter from "../../runner/migration-reporter";

const normalizeName = (name: string) =>
  /^@/.test(name) ? name.slice(1).split("/").join("__") : name;

/**
 * Parse package.json and node_modules to find packages missing types
 */
export function suggestTypes(reporter: MigrationReporter) {
  const nodeModules = path.join(process.cwd(), "node_modules");
  const rawPackageJson = fs.readFileSync(
    path.join(process.cwd(), "package.json"),
    "utf8"
  );
  const myPackageJson = JSON.parse(rawPackageJson);
  // Go through each package, and determine if it has a type definitions defined in its package.json
  const maybeNeedTypes = Object.keys(myPackageJson.dependencies)
    .filter((key) => {
      const pathParts = key.split("/");
      const modulePackageJson = path.join(
        nodeModules,
        ...pathParts,
        "package.json"
      );
      const rawData = fs.readFileSync(modulePackageJson, "utf8");
      const parsedJson = JSON.parse(rawData);
      return !parsedJson.typings && !parsedJson.types;
    })
    // For all remaining files, figure out if there is a `@types` definition available for our specified version
    .map((key) => {
      const normalName = normalizeName(key);
      return `@types/${normalName}@${myPackageJson.dependencies[key]}`;
    })
    // Find out if the package exists
    .map((pkgName) =>
      new Promise((resolve, reject) => {
        exec(`yarn info ${pkgName}`, (err, _stdout, stderr) => {
          if (err) {
            reject(err);
            return;
          }
          if (stderr) {
            reject(stderr);
            return;
          }
          resolve(pkgName);
        });
      }).catch(() => null)
    );

  // Print out packages that need types, and have something available in `@types`
  return Promise.all(maybeNeedTypes)
    .then((results) => results.filter((val) => val != null))
    .then((results) => results.join(" "))
    .then((result) => reporter.maybeNeedTypes(result));
}
