// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Container from './Container.js';

test('Container renders', () => {
  const component = renderer.create(<Container />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
