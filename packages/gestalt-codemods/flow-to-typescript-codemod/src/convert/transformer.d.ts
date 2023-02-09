import * as t from "@babel/types";
import MigrationReporter from "../runner/migration-reporter";
import { State } from "../runner/state";

export type TransformerInput = {
  reporter: MigrationReporter;
  state: State;
  file: t.File;
};

export type Transformer<T = unknown> = (
  transformerInput: TransformerInput
) => Promise<T> | T;
