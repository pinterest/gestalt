// @flow strict
import { type Node as ReactNode } from 'react';
import { ExperimentProvider } from 'gestalt';
import { useAppContext } from '../appContext';

/**
 * To implement experimental behavior in the docs:
 * - Add your experiment name here
 * - Unless you want the experimental behavior live on the docs for everyone, REMOVE YOUR EXPERIMENT HERE before merging your PR!
 * */

const enabledExperiments = {
  ComboBox: ['web_gestalt_popover_v2_combobox', 'mweb_gestalt_popover_v2_combobox'],
  Dropdown: ['web_gestalt_popover_v2_dropdown', 'mweb_gestalt_popover_v2_dropdown'],
  HelpButton: ['web_gestalt_popover_v2_helpbutton', 'mweb_gestalt_popover_v2_helpbutton'],
  OverlayPanel: [
    'web_gestalt_popover_v2_confirmationpopover',
    'mweb_gestalt_popover_v2_confirmationpopover',
  ],
  Popover: ['web_gestalt_popover_v2', 'mweb_gestalt_popover_v2'],
  PopoverEducational: [
    'web_gestalt_popover_v2_popovereducational',
    'mweb_gestalt_popover_v2_popovereducational',
  ],
  Tooltip: ['web_gestalt_tooltip_v2', 'mweb_gestalt_tooltip_v2'],
};

type Experiment = { anyEnabled: boolean, group: string };

function buildExperimentsObj(experiments: $ReadOnlyArray<string>) {
  return experiments.reduce(
    (acc: Record<string, Experiment>, cur: string) => ({
      ...acc,
      [cur]: { anyEnabled: true, group: 'enabled' },
    }),
    {},
  );
}

export function useDocsExperiments(): Record<string, Experiment> {
  const { experiments } = useAppContext();

  return buildExperimentsObj(!experiments ? [] : enabledExperiments[experiments] ?? []);
}

type Props = { children: ReactNode };

export default function DocsExperimentProvider({ children }: Props): ReactNode {
  const experiments = useDocsExperiments();
  return <ExperimentProvider value={experiments}>{children}</ExperimentProvider>;
}
