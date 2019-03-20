// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Tooltip from './Tooltip.js';

test('Tooltip renders', () => {
  const element = document.createElement('div');
  const component = create(
    <Tooltip anchor={element} id="test-tooltip-id" text="This is a tooltip" />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tooltip does not render when the anchor is null', () => {
  const tree = create(
    <Tooltip anchor={null} id="test-tooltip-id" text="This is a tooltip" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
