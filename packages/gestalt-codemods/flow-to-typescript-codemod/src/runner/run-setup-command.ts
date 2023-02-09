import path from "path";
import fs from "fs-extra";
import { SetupCommandCliArgs } from "../cli/arguments";
import { logger } from "./logger";
import MigrationReporter from "./migration-reporter";
import { stdOutFormatter } from "./migration-reporter/formatters/std-out-formatter";
import { jsonFormatter } from "./migration-reporter/formatters/json-formatter";
import { installTypescript } from "../setup/install-typescript";
import { defaultTsConfig } from "../setup/ts-config";
import { suggestTypes } from "../setup/suggest-types";

/**
 * Run different setup scripts based on the CLI arguments
 * @param argv - CLI arguments
 */
export async function runSetupCommand(argv: SetupCommandCliArgs) {
  if (argv.installTS) {
    logger.await("Installing Typescript..");
    await installTypescript();
  }

  if (argv.recommendTypeDefinitions) {
    const filePathReporter = new MigrationReporter();
    logger.await("Searching for type definitions..");
    await suggestTypes(filePathReporter);
    const report = filePathReporter.generateReport();
    const formatter =
      argv.format === "json" ? jsonFormatter(argv.output) : stdOutFormatter;
    await MigrationReporter.logReport(report, formatter);
  }

  if (argv.setupTSConfig) {
    if (!fs.existsSync(argv.path)) {
      logger.error(`Provided ${path} does not exist.`);
      process.exit(1);
    }
    logger.await("Setting root TSConfig..");
    defaultTsConfig(argv.path);
  }
}
