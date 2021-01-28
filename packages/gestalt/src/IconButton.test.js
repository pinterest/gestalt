// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import IconButton from './IconButton.js';

test('IconButton renders with icon', () => {
  const component = create(<IconButton accessibilityLabel="Pinterest" icon="pin" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('IconButton renders with disabled state', () => {
  const component = create(<IconButton accessibilityLabel="Pinterest" icon="pin" disabled />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('IconButton renders with svg', () => {
  const component = create(
    <IconButton
      accessibilityLabel="Pinterest"
      dangerouslySetSvgPath={{ __path: 'M13.00,20.00' }}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('accessibilityControls', () => {
  const instance = create(
    <IconButton accessibilityLabel="" accessibilityControls="another-element" />,
  ).root;
  expect(instance.find((element) => element.type === 'button').props['aria-controls']).toContain(
    'another-element',
  );
});

test('accessibilityExpanded', () => {
  const instance = create(<IconButton accessibilityLabel="" accessibilityExpanded />).root;
  expect(instance.find((element) => element.type === 'button').props['aria-expanded']).toBe(true);
});

test('accessibilityHaspopup', () => {
  const instance = create(<IconButton accessibilityLabel="" accessibilityHaspopup />).root;
  expect(instance.find((element) => element.type === 'button').props['aria-haspopup']).toBe(true);
});

test('accessibilityLabel', () => {
  const instance = create(<IconButton accessibilityLabel="hello" />).root;
  expect(instance.find((element) => element.type === 'button').props['aria-label']).toContain(
    'hello',
  );
});
