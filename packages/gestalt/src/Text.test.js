// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Text from './Text.js';

test('Text renders', () => {
  const tree = create(<Text />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text orange adds the orange color class', () => {
  const tree = create(<Text color="orange" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text size sm adds the small size class', () => {
  const tree = create(<Text size="sm" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text truncate should add a title when the children are text only', () => {
  const tree = create(
    <Text truncate>
      Shall I compare thee to a summer&#39;s day - William Shakespeare
    </Text>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text truncate should not add a title when the children are objects', () => {
  const tree = create(
    <Text truncate>
      <div>Summer reading:</div>
      Shall I compare thee to a summer&#39;s day - William Shakespeare
    </Text>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
