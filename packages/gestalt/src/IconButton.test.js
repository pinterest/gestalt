// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import IconButton from './IconButton.js';

test('IconButton renders with icon', () => {
  const component = renderer.create(
    <IconButton accessibilityLabel="Pinterest" icon="pin" />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('IconButton renders with disabled state', () => {
  const component = renderer.create(
    <IconButton accessibilityLabel="Pinterest" icon="pin" disabled />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('IconButton renders with svg', () => {
  const component = renderer.create(
    <IconButton
      accessibilityLabel="Pinterest"
      dangerouslySetSvgPath={{ __path: 'M13.00,20.00' }}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
