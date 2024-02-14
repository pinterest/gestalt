// Remove after Dropdown is fully released
// @flow strict
import { render } from '@testing-library/react';
import ExperimentProvider from '../../contexts/ExperimentProvider';

export default function renderWithExperiment(
  experiment: string,
  children: React$Element<React$ElementType>,
): ReturnType<typeof render> {
  return render(
    <ExperimentProvider value={{ [experiment]: { 'anyEnabled': true, 'group': 'enabled' } }}>
      {children}
    </ExperimentProvider>,
  );
}
