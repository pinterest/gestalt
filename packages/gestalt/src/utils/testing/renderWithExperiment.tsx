import {render} from '@testing-library/react';
import ExperimentProvider from '../../contexts/ExperimentProvider';

export default function renderWithExperiment(
  experiment: string,
  children: React.ReactElement<React.ComponentProps<React.ElementType>>,
): ReturnType<typeof render> {
  return render(
    <ExperimentProvider value={{ [experiment]: { 'anyEnabled': true, 'group': 'enabled' } }}>
      {children}
    </ExperimentProvider>,
  );
}
