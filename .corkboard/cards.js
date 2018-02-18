import React, { isValidElement } from 'react';
import { registerCard, ns as registerNamespace } from 'corkboard';
import PageHeader from './PageHeader';
import Card from './Card';
import CombinationInternal from './Combination';
import PropTableInternal from './PropTable';
import ExampleInternal from './Example';
import Markdown from './Markdown';

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
