import { ReactNode } from 'react';
import { ExperimentProvider } from 'gestalt';
import { useAppContext } from '../appContext';

/**
 * To implement experimental behavior in the docs:
 * - Add your experiment name here
 * - Unless you want the experimental behavior live on the docs for everyone, REMOVE YOUR EXPERIMENT HERE before merging your PR!
 * */

const enabledExperiments = {
  VR01Tokens: ['web_gestalt_visualrefresh', 'web_gestalt_visualrefresh'],
  CA01Tokens: [
    'web_gestalt_calico01',
    'web_gestalt_calico01',
    'web_gestalt_visualrefresh',
    'web_gestalt_visualrefresh',
  ],
} as const;

type ExperimentKey = keyof typeof enabledExperiments;

type Experiment = {
  anyEnabled: boolean;
  group: string;
};

function buildExperimentsObj(experiments: ReadonlyArray<string>) {
  return experiments.reduce<Record<string, any>>(
    (acc: Record<string, Experiment>, cur: string) => ({
      ...acc,
      [cur]: { anyEnabled: true, group: 'enabled' },
    }),
    {},
  );
}

export function useDocsExperiments(): Record<string, Experiment> {
  const { experiments } = useAppContext();

  return buildExperimentsObj(
    !experiments ? [] : enabledExperiments[experiments as ExperimentKey] ?? [],
  );
}

type Props = {
  children: ReactNode;
};

export default function DocsExperimentProvider({ children }: Props) {
  const experiments = useDocsExperiments();

  return <ExperimentProvider value={experiments}>{children}</ExperimentProvider>;
}
