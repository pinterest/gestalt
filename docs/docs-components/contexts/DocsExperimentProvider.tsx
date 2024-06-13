import { ReactNode } from 'react';
import { ExperimentProvider } from 'gestalt';
import { useAppContext } from '../appContext';

/**
 * To implement experimental behavior in the docs:
 * - Add your experiment name here
 * - Unless you want the experimental behavior live on the docs for everyone, REMOVE YOUR EXPERIMENT HERE before merging your PR!
 * */

const enabledExperiments = {
  Popover: ['web_gestalt_popover_v2', 'mweb_gestalt_popover_v2'],
  Tooltip: ['web_gestalt_tooltip_v2', 'mweb_gestalt_tooltip_v2'],
  Tokens: ['web_gestalt_visualRefresh', 'web_gestalt_visualRefresh'],
} as const;

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

  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Dropdown: readonly Popover: readonly ["web_gestalt_popover_v2", "mweb_gestalt_popover_v2"]; readonly Tooltip: readonly [...]; }'.
  return buildExperimentsObj(!experiments ? [] : enabledExperiments[experiments] ?? []);
}

type Props = {
  children: ReactNode;
};

export default function DocsExperimentProvider({ children }: Props) {
  const experiments = useDocsExperiments();

  return <ExperimentProvider value={experiments}>{children}</ExperimentProvider>;
}
