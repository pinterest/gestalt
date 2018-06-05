// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Label from '../Label';

test('Label renders', () => {
  const component = renderer.create(<Label htmlFor="email">Email</Label>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
