// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Heading from '../Heading';

test('Heading small', () => {
  const tree = create(<Heading size="sm" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading xsmall with level 3', () => {
  const tree = create(<Heading size="xs" accessibilityLevel={3} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading small with id', () => {
  const tree = create(<Heading size="sm" id="account-basics" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading default overflow', () => {
  const tree = create(<Heading size="sm" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading overflow normal', () => {
  const tree = create(<Heading size="sm" overflow="normal" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading truncate adds a title when the children are text only', () => {
  const tree = create(
    <Heading truncate>When we two parted - Lord Byron</Heading>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading truncate does not add a title when the children are objects', () => {
  const tree = create(
    <Heading truncate>
      <div>Breakup reading:</div>
      When we two parted - Lord Byron
    </Heading>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
