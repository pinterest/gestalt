/* eslint-env jest */
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
