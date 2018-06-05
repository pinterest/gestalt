// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Flyout from '../Flyout';

test('Flyout renders', () => {
  const element = document.createElement('div');
  const component = create(
    <Flyout
      anchor={element}
      idealDirection="down"
      onDismiss={jest.fn()}
      size="sm"
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Flyout does not render when the anchor is null', () => {
  const tree = create(<Flyout anchor={null} onDismiss={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
