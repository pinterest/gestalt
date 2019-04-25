// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import List from './List.js';

test('List renders', () => {
  const component = renderer.create(
    <List items={[{ onClick: () => {}, children: 'Item' }]} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
