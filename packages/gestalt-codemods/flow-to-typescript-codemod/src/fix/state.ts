import { Project } from "ts-morph";
import { FixCommandCliArgs } from "../cli/arguments";
import { logger } from "../runner/logger";
import MigrationReporter from "../runner/migration-reporter";

export interface FixCommandState {
  argv: FixCommandCliArgs;
  migrationReporter: MigrationReporter;
  project: Project;
}

export const getDiagnostics = (project: Project) => {
  logger.info("Getting type errors..");
  const diagnostics = project.getPreEmitDiagnostics();
  logger.info(`${diagnostics.length} type errors received`);
  return diagnostics;
};

export const getFixState = (argv: FixCommandCliArgs): FixCommandState => {
  // Setup
  logger.info("Fixing types..");

  const migrationReporter = new MigrationReporter();

  logger.info("Starting TypeScript..");
  const project = new Project({
    tsConfigFilePath: argv.config,
  });

  return { argv, migrationReporter, project };
};
