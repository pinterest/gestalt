import React from 'react';
import { registerCard, ns as registerNamespace } from 'corkboard';
import PageHeader from './components/PageHeader';
import Card from './components/Card';
import CombinationInternal from './components/Combination';
import PropTableInternal from './components/PropTable';
import ExampleInternal from './components/Example';
import Markdown from './components/Markdown';
import StateRecorderInternal from './components/StateRecorder';

export const ns = (name, description = '') => {
  registerNamespace(name);
  registerCard(<PageHeader name={name} description={description} />);
};

export const card = (...args) => {
  registerCard(<Card args={args} />);
};

export const md = str => (
  <Markdown text={typeof str === 'string' ? str : str.join('\n')} />
);

export const PropTable = PropTableInternal;
export const Example = ExampleInternal;
export const Combination = CombinationInternal;
export const StateRecorder = StateRecorderInternal;
