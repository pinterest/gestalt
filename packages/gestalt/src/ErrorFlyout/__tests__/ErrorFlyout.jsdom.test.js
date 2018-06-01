// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import ErrorFlyout from '../ErrorFlyout';

test('ErrorFlyout renders', () => {
  const element = document.createElement('div');
  const component = renderer.create(
    <ErrorFlyout
      anchor={element}
      message="Email required"
      onDismiss={() => {}}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ErrorFlyout does not render when the anchor is null', () => {
  const component = renderer.create(
    <ErrorFlyout anchor={null} message="Email required" onDismiss={() => {}} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
