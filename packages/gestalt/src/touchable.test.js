// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Touchable from './Touchable.js';

test('Touchable renders', () => {
  const tree = create(
    <Touchable onTouch={() => {}}>Touchable</Touchable>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Touchable sets correct mouse cursor', () => {
  const tree = create(
    <Touchable onTouch={() => {}} mouseCursor="zoomIn">
      Touchable
    </Touchable>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Touchable sets correct rounding', () => {
  const tree = create(
    <Touchable onTouch={() => {}} rounding="circle">
      Touchable
    </Touchable>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Touchable sets fullWidth correctly', () => {
  const tree = create(
    <Touchable onTouch={() => {}} fullWidth={false}>
      Touchable
    </Touchable>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Touchable sets fullHeight correctly', () => {
  const tree = create(
    <Touchable onTouch={() => {}} fullHeight>
      Touchable
    </Touchable>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
