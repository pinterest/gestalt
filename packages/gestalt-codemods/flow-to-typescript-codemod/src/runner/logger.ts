import { Signale } from "signale";

/**
 * Create a Signale logger, that is either normal or loading
 */
const buildLogger = (interactive = false) => {
  return new Signale({
    stream: process.stdout,
    interactive,
  });
};
export const logger = buildLogger();
export const interactiveLogger = buildLogger(true);
