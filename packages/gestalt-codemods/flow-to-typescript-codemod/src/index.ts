import fs from "fs-extra";
import cluster from "cluster";
import chalk from "chalk";
import {
  FixCommandCliArgs,
  ConvertCommandCliArgs,
  SetupCommandCliArgs,
} from "./cli/arguments";
import { parseCommands } from "./cli/yargs";
import { logger } from "./runner/logger";
import { runPrimaryAsync } from "./runner/run-primary-async";
import { runWorkerAsync } from "./runner/run-worker-async";
import { runSetupCommand } from "./runner/run-setup-command";
import { componentPropChecks } from "./fix/component-prop-checks";
import { autoSuppressErrors } from "./fix/suppressions/auto-suppress";
import { removeUnusedErrors } from "./fix/suppressions/remove-unused";
import { generateReport } from "./fix/generate-report";
import { autoImport } from "./fix/auto-import";
import { fixTypeExports } from "./fix/fix-type-exports";
import { getFixState } from "./fix/state";

if (cluster.isMaster) {
  logger.log();
  logger.log(chalk.underline.bgBlue("Stripe Flow to TypeScript Codemod"));
  logger.log();
}

/**
 * Run the setup command
 * Different flags enable different setup scripts
 */
const setup = async (argv: SetupCommandCliArgs) => {
  if (argv.silent) {
    logger.disable();
  }
  await runSetupCommand(argv);
};

/**
 * Run the Flow -> TS conversion
 * Files are converted in batches in parallel processes
 */
const convert = async (argv: ConvertCommandCliArgs) => {
  if (argv.silent) {
    logger.disable();
  }

  for (const p of argv.path) {
    if (!fs.existsSync(p)) {
      logger.error(`Provided path ${p} does not exist.`);
      process.exit(1);
    }
  }

  if (cluster.isMaster) {
    runPrimaryAsync(argv).catch((error) => {
      logger.error(error);
      process.exit(1);
    });
  } else {
    runWorkerAsync(argv).catch((error) => {
      logger.error(error);
      process.exit(1);
    });
  }
};

/**
 * Fix and report TS errors after conversion
 */
const fix = async (argv: FixCommandCliArgs) => {
  if (argv.silent) {
    logger.disable();
  }

  const state = getFixState(argv);

  // Read only
  if (argv.tsProps) {
    await componentPropChecks(state);
  }
  if (argv.generateReport) {
    generateReport(state);
  }

  // Modifies files
  if (argv.removeUnused) {
    await removeUnusedErrors(state);
  }
  if (argv.autoSuppressErrors) {
    await autoSuppressErrors(state);
  }
  if (argv.autoImport) {
    await autoImport(state);
  }
  if (argv.fixTypeExports) {
    await fixTypeExports(state);
  }
};

parseCommands(convert, fix, setup);
