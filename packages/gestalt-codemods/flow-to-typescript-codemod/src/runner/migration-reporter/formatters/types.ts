import { MigrationReport } from "..";

export type MigrationReportFormatter = (
  report: MigrationReport
) => Promise<void>;
