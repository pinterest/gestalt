// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Tabs from '../Tabs';

test('Tabs renders', () => {
  const tree = create(
    <Tabs
      tabs={[
        { text: 'News', href: '#' },
        { text: 'You', href: '#' },
        { text: 'Messages', href: '#' },
      ]}
      activeTabIndex={0}
      onChange={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
