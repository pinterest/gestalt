// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Flex from './Flex.js';

test('Flex renders', () => {
  const tree = create(
    <Flex>
      <div />
      <div />
      <div />
      <div />
    </Flex>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Flex renders with specified gap', () => {
  const tree = create(
    <Flex gap={4}>
      <div />
      <div />
      <div />
      <div />
    </Flex>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Flex aligns items', () => {
  const tree = create(
    <Flex alignItems="end">
      <div />
      <div />
      <div />
      <div />
    </Flex>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Flex justifies content', () => {
  const tree = create(
    <Flex justifyContent="around">
      <div />
      <div />
      <div />
      <div />
    </Flex>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
