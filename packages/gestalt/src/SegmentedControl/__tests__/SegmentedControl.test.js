// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import SegmentedControl from '../SegmentedControl';

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
