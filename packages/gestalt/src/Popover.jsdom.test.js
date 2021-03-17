// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Popover from './Popover.js';

test('Popover renders', () => {
  const element = document.createElement('div');
  const component = create(
    <Popover anchor={element} idealDirection="down" onDismiss={jest.fn()} size="sm" />,
    {
      createNodeMock: () => true,
    },
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Popover renders as error', () => {
  const element = document.createElement('div');
  const component = create(
    <Popover anchor={element} idealDirection="down" onDismiss={jest.fn()} color="red" size="sm" />,
    {
      createNodeMock: () => true,
    },
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Popover renders as blue', () => {
  const element = document.createElement('div');
  const component = create(
    <Popover anchor={element} idealDirection="down" onDismiss={jest.fn()} color="blue" size="sm" />,
    {
      createNodeMock: () => true,
    },
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Popover does not render when the anchor is null', () => {
  const tree = create(<Popover anchor={null} onDismiss={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
