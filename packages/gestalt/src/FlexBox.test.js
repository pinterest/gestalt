// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import FlexBox from './FlexBox.js';

test('FlexBox renders', () => {
  const tree = create(<FlexBox />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('FlexBox has correct *-flex-column classes when display is flexColumn', () => {
  const tree = create(<FlexBox direction="column" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('FlexBox allows zero values for whitespace', () => {
  const tree = create(<FlexBox padding={0} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('FlexBox aligns items', () => {
  const tree = create(
    <FlexBox alignItems="center">
      <div />
      <div />
      <div />
    </FlexBox>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('FlexBox justifies content', () => {
  const tree = create(
    <FlexBox justifyContent="around">
      <div />
      <div />
      <div />
    </FlexBox>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
