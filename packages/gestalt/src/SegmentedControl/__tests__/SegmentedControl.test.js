/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import SegmentedControl from '../SegmentedControl';

test('SegmentedControl renders', () => {
  const tree = create(
    <SegmentedControl
      items={['News', 'You', 'Messages']}
      selectedItemIndex={0}
      onChange={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
