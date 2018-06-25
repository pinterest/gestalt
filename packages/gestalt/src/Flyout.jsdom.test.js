// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Flyout from './Flyout.js';

test('Flyout renders', () => {
  const element = document.createElement('div');
  const component = create(
    <Flyout
      anchor={element}
      idealDirection="down"
      onDismiss={jest.fn()}
      size="sm"
    />,
    {
      createNodeMock: () => true,
    }
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Flyout renders as error', () => {
  const element = document.createElement('div');
  const component = create(
    <Flyout
      anchor={element}
      idealDirection="down"
      onDismiss={jest.fn()}
      color="orange"
      size="sm"
    />,
    {
      createNodeMock: () => true,
    }
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Flyout renders as blue', () => {
  const element = document.createElement('div');
  const component = create(
    <Flyout
      anchor={element}
      idealDirection="down"
      onDismiss={jest.fn()}
      color="blue"
      size="sm"
    />,
    {
      createNodeMock: () => true,
    }
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Flyout does not render when the anchor is null', () => {
  const tree = create(<Flyout anchor={null} onDismiss={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
