import { registerCard } from 'corkboard';
import CombinationInternal from './components/Combination';
import PropTableInternal from './components/PropTable';
import ExampleInternal from './components/Example';
import StateRecorderInternal from './components/StateRecorder';

export const card = comp => {
  registerCard(comp);
};

export const PropTable = PropTableInternal;
export const Example = ExampleInternal;
export const Combination = CombinationInternal;
export const StateRecorder = StateRecorderInternal;
