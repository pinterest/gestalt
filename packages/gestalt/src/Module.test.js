// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Module from './Module.js';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Module>
        <div>rest of module</div>
      </Module>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
