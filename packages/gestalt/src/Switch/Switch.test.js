// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Switch from './Switch';

test('Switch', () => {
  const tree = create(<Switch id="test" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch disabled', () => {
  const tree = create(
    <Switch id="test" disabled onChange={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch switched', () => {
  const tree = create(<Switch id="test" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch switched & disabled', () => {
  const tree = create(
    <Switch id="test" disabled onChange={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
