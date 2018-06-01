// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Divider from '../Divider';

test('Divider renders', () => {
  const component = renderer.create(<Divider />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
