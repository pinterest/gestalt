// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Pog from './Pog.js';

test('Pog renders with icon', () => {
  const tree = create(<Pog icon="heart" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pog renders with svg', () => {
  const tree = create(
    <Pog dangerouslySetSvgPath={{ __path: 'M13.00,20.00' }} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pog active renders', () => {
  const tree = create(<Pog icon="heart" active />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pog focused renders', () => {
  const tree = create(<Pog icon="heart" focused />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pog hovered renders', () => {
  const tree = create(<Pog icon="heart" hovered />).toJSON();
  expect(tree).toMatchSnapshot();
});
