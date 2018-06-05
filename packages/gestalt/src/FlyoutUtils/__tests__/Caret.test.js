// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Caret from '../Caret';

test('Caret renders with direction up', () => {
  const component = renderer.create(<Caret direction="up" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Caret renders with direction down', () => {
  const component = renderer.create(<Caret direction="down" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Caret renders with direction left', () => {
  const component = renderer.create(<Caret direction="left" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Caret renders with direction right', () => {
  const component = renderer.create(<Caret direction="right" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
