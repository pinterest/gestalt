// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Column from '../Column';

test('Column deprecated span', () => {
  const component = renderer.create(<Column xs={1}>Hello world</Column>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Column span', () => {
  const component = renderer.create(<Column span={1}>Hello world</Column>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
