import path from "path";
import fs from "fs-extra";
import os from "os";
import cluster from "cluster";
import { ConvertCommandCliArgs } from "../cli/arguments";
import { logger, interactiveLogger } from "./logger";
import {
  findFlowFilesAsync,
  FlowFileList,
  FlowFileType,
} from "./find-flow-files";
import MigrationReporter, { MigrationReport } from "./migration-reporter";
import { stdOutFormatter } from "./migration-reporter/formatters/std-out-formatter";
import { jsonFormatter } from "./migration-reporter/formatters/json-formatter";
import { csvFormatter } from "./migration-reporter/formatters/csv-formatter";

/**
 * Randomize the order of an array.
 */
export function shuffle<T>(a: Array<T>) {
  let j;
  let x;
  let i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

/**
 * Find files, and run the transform on files in parallel processes
 */
export async function runPrimaryAsync(options: ConvertCommandCliArgs) {
  const filePathReporter = new MigrationReporter();

  const filePromises: Array<Promise<FlowFileList>> = [];
  for (const p of options.path) {
    const isDirectory = fs.lstatSync(p).isDirectory();
    if (isDirectory) {
      filePromises.push(
        findFlowFilesAsync(
          p,
          options.ignore,
          filePathReporter,
          options.stripPathsForIgnore
        )
      );
    } else {
      logger.info("Path to convert is a file, only converting single file.");
      const filePromise: Promise<FlowFileList> = Promise.resolve([
        { filePath: p, fileType: FlowFileType.FLOW },
      ]);
      filePromises.push(filePromise);
    }
  }

  let flowFilePaths: FlowFileList = [];
  await Promise.all(filePromises).then((results) => {
    results.forEach((result) => {
      flowFilePaths = flowFilePaths.concat(result);
    });
  });

  // Shuffle the array since files near each other in the folder hierarchy have similar
  // workloads and we want to evenly spread workloads out among workers.
  shuffle(flowFilePaths);
  const cpus = os.cpus().length;
  /** The size of a file batch that we send to a worker. */
  const BATCH = Math.min(
    Math.max(Math.trunc(flowFilePaths.length / cpus), 1),
    50
  );
  logger.note(`Selecting a batch size of ${BATCH}.`);

  // Generate our batches of files
  const batches: Array<FlowFileList> = [];
  for (let i = 0; i < flowFilePaths.length; i += BATCH) {
    batches.push(flowFilePaths.slice(i, i + BATCH));
  }
  const totalBatches = batches.length;

  const workerCount = Math.min(cpus, batches.length);
  logger.note(
    `Spawning ${workerCount} workers to process ${flowFilePaths.length} files.`
  );

  if (!options.write) {
    logger.info(
      "Running in dry-mode! No TypeScript will be written to disk unless specified with --write."
    );
  }

  const reports: Array<MigrationReport> = [filePathReporter.generateReport()];

  // Spawns a worker for every CPU on our machine to maximize parallelization.
  //
  // Lifetime of a worker:
  //
  // 1. Primary sends a batch to worker.
  // 2. Worker process batch and sends back a `next` message.
  // 3. Primary sends worker a new batch.
  // 4. When primary runs out of batches, instead of sending a batch it sends a `report` message.
  // 5. The worker responds with a report of its activities.
  // 6. Primary kills the worker.
  const workers: Array<cluster.Worker> = [];
  const areWorkersCompleted = () => {
    return workers.every((worker) => worker.isDead());
  };
  // Setup logging progress
  const updateProgress = () => {
    if (areWorkersCompleted()) {
      interactiveLogger.complete(
        `Finished processing batches - [${totalBatches}/${totalBatches}]`
      );
      return;
    }
    interactiveLogger.pending(
      `Processing batches - [${totalBatches - batches.length}/${totalBatches}]`
    );
  };

  for (let i = 0; i < cpus; i++) {
    const initialBatch = batches.pop();
    updateProgress();
    if (!initialBatch) break; // Stop spawning workers if we have no more batches!

    let timeoutId: NodeJS.Timeout | null = null;

    const worker = cluster.fork();
    workers.push(worker);
    sendBatch(initialBatch);

    worker.on("exit", () => {
      if (areWorkersCompleted()) {
        updateProgress();
        finish();
      }
    });

    worker.on("message", (message) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      switch (message.type) {
        // Either send the worker a new batch or ask the worker to send us a report of
        // its activities.
        case "next": {
          const nextBatch = batches.pop();
          if (nextBatch) {
            sendBatch(nextBatch);
            updateProgress();
          } else {
            worker.send({ type: "report" });
          }
          break;
        }

        // Once we get the worker’s final report, kill the worker.
        case "report": {
          reports.push(message.report);
          worker.kill();
          break;
        }
      }
    });

    function sendBatch(batch: FlowFileList) {
      worker.send({ type: "batch", batch });

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      timeoutId = setTimeout(() => {
        logger.warn(
          `Worker #${
            i + 1
          } hasn’t responded in 2 minutes after sending the batch:`
        );
        for (const file of batch) {
          logger.warn(`• ${path.relative(process.cwd(), file.filePath)}`);
        }
      }, 2 * 60 * 1000);
    }
  }

  // Before the primary process exits, merge the reports of all our workers and log it to the
  // console for debugging.
  async function finish() {
    if (options.delete) {
      logger.info("Deleting all the Flow files.");
      const toRemoveCalls = [];
      for (const flowFilePath of flowFilePaths) {
        const wasSkipped =
          (flowFilePath.fileType === FlowFileType.NO_FLOW &&
            options.skipNoFlow) ||
          (flowFilePath.fileType === FlowFileType.NO_ANNOTATION &&
            !options.convertUnannotated);

        if (!wasSkipped) {
          toRemoveCalls.push(fs.remove(flowFilePath.filePath));
        }
      }
      await Promise.all(toRemoveCalls);
    } else {
      logger.info(
        "Not modifying original source files. Run with -d to delete after conversion."
      );
    }
    if (options.silent && options.format === "stdout") {
      return;
    }

    logger.note(`Merging reports from ${workerCount} workers.`);
    const mergedReport = MigrationReporter.mergeReports(reports);
    let formatter = stdOutFormatter;
    if (options.format === "json") {
      formatter = jsonFormatter(options.output);
    } else if (options.format === "csv") {
      formatter = csvFormatter(options.output);
    }
    await MigrationReporter.logReport(mergedReport, formatter);

    if (mergedReport.totals.error > 0) {
      logger.error(
        `Encountered ${mergedReport.totals.error} errors while processing ${mergedReport.lineCount} lines in ${flowFilePaths.length} files.`
      );
      process.exit(1);
    }

    if (options.write) {
      logger.success(
        `Converted ${mergedReport.lineCount} lines in ${flowFilePaths.length} files.`
      );
    } else {
      logger.success(
        `Processed ${mergedReport.lineCount} lines in ${flowFilePaths.length} files.`
      );
    }
  }
}
