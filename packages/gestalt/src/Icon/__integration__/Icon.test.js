/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import Icon from '../Icon';

test('Icon renders', () => {
  const tree = create(<Icon icon="add" accessibilityLabel="Add" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon has correct aria-hidden property applied when accessibilityLabel is an empty string', () => {
  const tree = create(<Icon icon="add" accessibilityLabel="" />).toJSON();
  expect(tree).toMatchSnapshot();
});
