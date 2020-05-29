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

test('accessibilityControls', () => {
  const instance = create(
    <Touchable onTouch={() => {}} accessibilityControls="another-element">
      Touchable
    </Touchable>
  ).root;
  expect(
    instance.find(element => element.type === 'div' && element.props.role === 'button').props['aria-controls']
  ).toContain('another-element');
});

test('accessibilityExpanded', () => {
  const instance = create(
    <Touchable onTouch={() => {}} accessibilityExpanded>
      Touchable
    </Touchable>
  ).root;
  expect(
    instance.find(element => element.type === 'div' && element.props.role === 'button').props['aria-expanded']
  ).toBe(true);
});

test('accessibilityHaspopup', () => {
  const instance = create(
    <Touchable onTouch={() => {}} accessibilityHaspopup>
      Touchable
    </Touchable>
  ).root;
  expect(
    instance.find(element => element.type === 'div' && element.props.role === 'button').props['aria-haspopup']
  ).toBe(true);
});

test('accessibilityLabel', () => {
  const instance = create(
    <Touchable onTouch={() => {}} accessibilityLabel="hello">
      Touchable
    </Touchable>
  ).root;
  expect(
    instance.find(element => element.type === 'div' && element.props.role === 'button').props['aria-label']
  ).toContain('hello');
});  
