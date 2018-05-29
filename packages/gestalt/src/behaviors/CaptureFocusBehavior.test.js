// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import CaptureFocusBehavior from './CaptureFocusBehavior';

test('CaptureFocusBehavior renders', () => {
  const tree = create(
    <CaptureFocusBehavior>Hello world</CaptureFocusBehavior>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
