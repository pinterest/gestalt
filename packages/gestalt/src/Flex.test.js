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
    </Flex>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Flex renders with direction: column', () => {
  const tree = create(
    <Flex direction="column">
      <div />
      <div />
      <div />
      <div />
    </Flex>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Flex renders with specified gap', () => {
  const tree = create(
    <Flex gap={8}>
      <div />
      <div />
      <div />
      <div />
    </Flex>,
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
    </Flex>,
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
    </Flex>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Flex.Item renders with specified props', () => {
  const tree = create(
    <Flex>
      <div />
      <Flex.Item alignSelf="end" flex="grow">
        <div />
      </Flex.Item>
      <div />
      <div />
    </Flex>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
