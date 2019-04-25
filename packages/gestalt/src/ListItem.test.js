// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import ListItem from './ListItem.js';

test('ListItem renders', () => {
  const component = renderer.create(
    <ListItem onClick={() => {}}>Item</ListItem>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
