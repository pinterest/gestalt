import path from "path";
import chalk from "chalk";
import { logger } from "../../logger";
import {
  MigrationReportItem,
  MigrationReport,
  MigrationReportItemSeverity,
} from "../migration-reporter";

const severityLoggerMap: Record<
  MigrationReportItemSeverity,
  (message?: string) => void
> = {
  [MigrationReportItemSeverity.info]: logger.info,
  [MigrationReportItemSeverity.warn]: logger.warn,
  [MigrationReportItemSeverity.error]: logger.error,
};

export async function stdOutFormatter(report: MigrationReport) {
  const groupedReport = report.migrationReportItems.reduce((accum, current) => {
    const typeBucket = accum[current.type] ?? [];
    typeBucket.push(current);
    accum[current.type] = typeBucket;

    return accum;
  }, {} as Record<string, Array<MigrationReportItem>>);

  logger.scope("typescriptify", "report");
  logger.log();
  logger.log(chalk.underline.bgBlue("Migration Report"));

  if (report.migrationReportItems.length === 0) {
    logger.complete("No Items to Report");
    return;
  }

  Object.keys(groupedReport).forEach((reportKey) => {
    logger.log();
    logger.log(`${chalk.underline.yellow(reportKey)}`);
    groupedReport[reportKey].forEach((reportItem) => {
      const log = severityLoggerMap[reportItem.severity];
      const { message } = reportItem;
      const pathText = `${path.relative(process.cwd(), reportItem.filePath)}:${
        reportItem.start.line
      }:${reportItem.start.column}`;
      log(`${message} ${chalk.dim(`(${pathText})`)}`);
    });
  });

  logger.log(`\n`);
  logger.complete(
    `Found ${report.totals.info} logs, ${report.totals.warn} warnings, and ${report.totals.error} errors.`
  );
}
