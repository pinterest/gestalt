// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import TableRow from './TableRow.js';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <TableRow>
        <div>row cells</div>
      </TableRow>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
