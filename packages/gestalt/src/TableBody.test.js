// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import TableBody from './TableBody.js';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <TableBody>
        <div>rows</div>
      </TableBody>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
