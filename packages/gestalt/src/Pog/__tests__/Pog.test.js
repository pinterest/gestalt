// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Pog from '../Pog';

test('Pog renders', () => {
  const tree = create(<Pog icon="heart" />).toJSON();
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
