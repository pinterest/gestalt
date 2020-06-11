// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Badge from './Badge.js';

it('Badge renders', () => {
  const component = create(<Badge text="Badge" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
