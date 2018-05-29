// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import NoScrollBehavior from './NoScrollBehavior';

test('NoScrollBehavior renders', () => {
  const tree = create(
    <NoScrollBehavior>Hello world</NoScrollBehavior>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
