// @flow
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

test('Text leading short adds the leadingShort class', () => {
  const tree = create(<Text leading="short" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text leading tall adds the leadingTall class', () => {
  const tree = create(<Text leading="tall" />).toJSON();
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
