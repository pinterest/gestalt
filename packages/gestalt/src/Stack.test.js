// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Stack from './Stack.js';

test('Stack renders', () => {
  const tree = create(
    <Stack>
      <div />
      <div />
      <div />
      <div />
    </Stack>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Stack renders with specified gap', () => {
  const tree = create(
    <Stack gap={4}>
      <div />
      <div />
      <div />
      <div />
    </Stack>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Stack aligns items', () => {
  const tree = create(
    <Stack alignItems="end">
      <div />
      <div />
      <div />
      <div />
    </Stack>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Stack justifies content', () => {
  const tree = create(
    <Stack justifyContent="around">
      <div />
      <div />
      <div />
      <div />
    </Stack>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
