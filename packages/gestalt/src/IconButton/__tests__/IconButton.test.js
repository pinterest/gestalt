// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import IconButton from '../IconButton';

test('IconButton renders', () => {
  const component = renderer.create(
    <IconButton accessibilityLabel="Pinterest" icon="pin" />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
