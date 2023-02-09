/**
 * This file is forked from a file I (@calebmer) wrote when working on a large Flow migration
 * project: [`flow-upgrade/src/findFlowFiles.js`][1]. It needed to be hyper-optimized for Facebook
 * scale. Why not reuse it?
 *
 * [1]: https://github.com/facebook/flow/blob/6491b1ac744dcac82ad07f4d9ff9deb6b977275d/packages/flow-upgrade/src/findFlowFiles.js
 */

import path from "path";
import fs from "fs-extra";
import ignore from "ignore";
import MigrationReporter from "./migration-reporter";

/**
 * How many bytes we should look at for the Flow pragma.
 */
const PRAGMA_BYTES = 5000;
export enum FlowFileType {
  FLOW,
  NO_FLOW,
  NO_ANNOTATION,
}

export type FlowFileList = Array<{ filePath: string; fileType: FlowFileType }>;

/**
 * Finds all of the Flow files in the provided directory as efficiently as
 * possible.
 *
 * NOTE: If we use promises then Node.js will quickly run out of memory on large
 * codebases (Facebook scale). Instead we use the callback API.
 */
export function findFlowFilesAsync(
  rootDirectory: string,
  ignoredDirectories: Array<string>,
  reporter: MigrationReporter,
  stripPathsForIgnore: boolean
): Promise<FlowFileList> {
  return new Promise((_resolve, _reject) => {
    // Tracks whether or not we have rejected our promise.
    let rejected = false;
    // How many asynchronous tasks are waiting at the moment.
    let waiting = 0;
    // All the valid file paths that we have found.
    const filePaths: FlowFileList = [];
    // Track ignored files
    const ig = ignore().add(ignoredDirectories);

    // Begin the recursion!
    processDirectory(rootDirectory, reporter);

    /**
     * Process a directory by looking at all of its entries and recursing
     * through child directories as is appropriate.
     */
    function processDirectory(directory: string, reporter: MigrationReporter) {
      // If we were rejected then we should not continue.
      if (rejected === true) {
        return;
      }
      // We are now waiting on this asynchronous task.
      waiting++;
      // Read the directory...
      fs.readdir(directory, (error, fileNames) => {
        if (error) {
          return reject(error);
        }
        // Process every file name that we got from reading the directory.
        for (let i = 0; i < fileNames.length; i++) {
          processFilePath(
            directory,
            fileNames[i],
            reporter,
            stripPathsForIgnore
          );
        }
        // We are done with this async task.
        done();
      });
    }

    /**
     * Process a directory file path by seeing if it is a directory and either
     * recursing or adding it to `filePaths`.
     */
    function processFilePath(
      directory: string,
      fileName: string,
      reporter: MigrationReporter,
      stripPathsForIgnore: boolean
    ) {
      // If we were rejected then we should not continue.
      if (rejected === true) {
        return;
      }
      // We are now waiting on this asynchronous task.
      waiting++;
      // Get the file path for this file.
      const filePath = path.join(directory, fileName);
      // ignore doesn't handle relative paths, so strip them. This does not work in all edge cases so is behind a flag
      const correctedPath = stripPathsForIgnore
        ? filePath.replace(/^(?:\.\.\/)+/, "")
        : filePath;
      // ensure that path is valid so that ignore check doesn't throw
      if (ignore.isPathValid(correctedPath) && ig.ignores(correctedPath)) {
        done();
        return;
      }
      // Get the stats for the file.
      fs.lstat(filePath, (error, stats) => {
        if (error) {
          return reject(error);
        }
        // If this is a directory...
        if (stats.isDirectory()) {
          // ...and it is not an ignored directory...
          if (fileName !== "node_modules" && fileName !== "transpiled") {
            // ...then recursively process the directory.
            processDirectory(filePath, reporter);
          }
        } else if (stats.isFile()) {
          // Otherwise if this is a JavaScript file...
          if (fileName.endsWith(".js") || fileName.endsWith(".jsx")) {
            // Then process the file path as JavaScript.
            processJavaScriptFilePath(filePath, stats.size, reporter);
          }
        }
        // We are done with this async task
        done();
      });
    }

    /**
     * Check if a file path really is a Flow file by looking for the @flow
     * header pragma.
     */
    function processJavaScriptFilePath(
      filePath: string,
      fileByteSize: number,
      reporter: MigrationReporter
    ) {
      // If we were rejected then we should not continue.
      if (rejected === true) {
        return;
      }
      // We are now waiting on this asynchronous task.
      waiting++;
      // Open the file path.
      fs.open(filePath, "r", (error, file) => {
        if (error) {
          return reject(error);
        }
        // Get the smaller of our pragma chars constant and the file byte size.
        const bytes = Math.min(PRAGMA_BYTES, fileByteSize);
        // Create the buffer we will read to.
        const buffer = Buffer.alloc(bytes);
        // Read a set number of bytes from the file.
        fs.read(file, buffer, 0, bytes, 0, (error) => {
          if (error) {
            return reject(error);
          }
          // If the buffer has the @flow pragma then add the file path to our
          // final file paths array.
          if (buffer.includes("@flow")) {
            filePaths.push({ filePath, fileType: FlowFileType.FLOW });
          } else if (buffer.includes("@noflow")) {
            filePaths.push({ filePath, fileType: FlowFileType.NO_FLOW });
            reporter.foundNoFlowAnnotation(filePath);
          } else {
            filePaths.push({ filePath, fileType: FlowFileType.NO_ANNOTATION });
            reporter.foundNonFlowfile(filePath);
          }
          // Close the file.
          fs.close(file, (error) => {
            if (error) {
              return reject(error);
            }
            // We are done with this async task
            done();
          });
        });
      });
    }

    /**
     * Our implementation of resolve that will only actually resolve if we are
     * done waiting everywhere.
     */
    function done() {
      // We don't care if we were rejected.
      if (rejected === true) {
        return;
      }
      // Decrement the number of async tasks we are waiting on.
      waiting--;
      // If we are finished waiting then we want to resolve our promise.
      if (waiting <= 0) {
        if (waiting === 0) {
          _resolve(filePaths);
        } else {
          reject(new Error(`Expected a positive number: ${waiting}`));
        }
      }
    }

    /**
     * Our implementation of reject that also sets `rejected` to false.
     */
    function reject(error: unknown) {
      rejected = true;
      _reject(error);
    }
  });
}
