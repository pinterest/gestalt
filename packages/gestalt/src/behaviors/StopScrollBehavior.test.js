// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import StopScrollBehavior from './StopScrollBehavior.js';

test('StopScrollBehavior renders', () => {
  const tree = create(
    <StopScrollBehavior>Hello world</StopScrollBehavior>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
