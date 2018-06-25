// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Icon from './Icon.js';

test('Icon renders', () => {
  const tree = create(<Icon icon="add" accessibilityLabel="Add" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon has correct aria-hidden property applied when accessibilityLabel is an empty string', () => {
  const tree = create(<Icon icon="add" accessibilityLabel="" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon uses the dangerouslySetSvgPath prop when icon path is not specified', () => {
  const tree = create(
    <Icon
      dangerouslySetSvgPath={{ __path: 'M13.00,20.00' }}
      accessibilityLabel="Line"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
