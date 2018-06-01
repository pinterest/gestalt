// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import ErrorFlyout from '../ErrorFlyout';

test('ErrorFlyout renders', () => {
  const component = renderer.create(
    <ErrorFlyout anchor={null} message="Email required" onDismiss={() => {}} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
