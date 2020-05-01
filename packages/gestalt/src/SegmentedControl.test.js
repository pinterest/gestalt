// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import SegmentedControl from './SegmentedControl.js';

test('SegmentedControl renders', () => {
  const tree = create(
    <SegmentedControl
      items={['News', 'You', 'Messages', <div key="dummy" />]}
      selectedItemIndex={0}
      onChange={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('SegmentedControl with responsive widths renders', () => {
  const tree = create(
    <SegmentedControl
      responsive
      items={['Short', 'Really really really long title']}
      selectedItemIndex={0}
      onChange={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
