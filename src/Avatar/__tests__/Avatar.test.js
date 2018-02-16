/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from '../Avatar';

test('Avatar renders multibyte names', () => {
  const component = renderer.create(<Avatar name="💩 astral" />, {
    createNodeMock() {
      return { clientWidth: 100 };
    },
  });
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
