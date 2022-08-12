// @flow strict
import { type Node } from 'react';
import { ExperimentProvider } from 'gestalt';

/**
 * To implement experimental behavior in the docs:
 * - Add your experiment name here
 * - Unless you want the experimental behavior live on the docs for everyone, REMOVE YOUR EXPERIMENT HERE before merging your PR!
 * */

const enabledExperiments = [];

function buildExperimentsObj(experiments: $ReadOnlyArray<string>) {
  return experiments.reduce(
    (
      acc: {|
        [string]: {|
          anyEnabled: boolean,
          group: string,
        |},
      |},
      cur: string,
    ) => ({
      ...acc,
      [cur]: { anyEnabled: true, group: 'enabled' },
    }),
    {},
  );
}

type Props = {| children: Node |};

export default function DocsExperimentProvider({ children }: Props): Node {
  return (
    <ExperimentProvider value={buildExperimentsObj(enabledExperiments)}>
      {children}
    </ExperimentProvider>
  );
}
