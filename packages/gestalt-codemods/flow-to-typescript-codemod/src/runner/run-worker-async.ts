import { ConvertCommandCliArgs } from "../cli/arguments";
import MigrationReporter from "./migration-reporter";
import { processBatchAsync } from "./process-batch";
import { logger } from "./logger";

/**
 * Start a timer to check in with child processes
 */
function startHeartbeat() {
  let currentTimer = 0;

  function _localHeartbeat() {
    currentTimer = setTimeout(() => {
      process.send!({ type: "heartbeat" });
      _localHeartbeat();
    });
  }

  _localHeartbeat();

  return function cancelHeartbeat() {
    clearTimeout(currentTimer);
  };
}

/**
 * Run an async process, requesting new batches as they are completed
 * @param options CLI arguments for Convert command
 */
export async function runWorkerAsync(options: ConvertCommandCliArgs) {
  const reporter = new MigrationReporter();

  process.on("message", (message) => {
    const cancelHeartbeat = startHeartbeat();
    switch (message.type) {
      // Process a batch of files and ask for more...
      case "batch": {
        processBatchAsync(reporter, message.batch, options).then(
          () => {
            process.send!({ type: "next" });
            cancelHeartbeat();
          },
          (error) => {
            cancelHeartbeat();
            logger.error(error);
            process.exit(1);
          }
        );
        break;
      }

      // We were asked for a report, so send one back!
      case "report": {
        cancelHeartbeat();
        process.send!({
          type: "report",
          report: reporter.generateReport(),
        });
        break;
      }
    }
  });
}
