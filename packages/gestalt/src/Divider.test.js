// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Divider from './Divider.js';

test('Divider renders', () => {
  const component = renderer.create(<Divider />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
