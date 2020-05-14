// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Row from './Row.js';

test('Row renders', () => {
  const tree = create(
    <Row>
      <div />
      <div />
      <div />
      <div />
    </Row>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Row renders with specified gap', () => {
  const tree = create(
    <Row gap={4}>
      <div />
      <div />
      <div />
      <div />
    </Row>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Row aligns items', () => {
  const tree = create(
    <Row alignItems="end">
      <div />
      <div />
      <div />
      <div />
    </Row>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Row justifies content', () => {
  const tree = create(
    <Row justifyContent="around">
      <div />
      <div />
      <div />
      <div />
    </Row>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
