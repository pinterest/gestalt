// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import TableRow from './TableRow.js';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <TableRow>
        <td>cell 1</td>
        <td>cell 2</td>
        <td>cell 3</td>
      </TableRow>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when clickable', () => {
  const tree = renderer
    .create(
      <TableRow onClick={() => {}}>
        <td>cell 1</td>
        <td>cell 2</td>
        <td>cell 3</td>
      </TableRow>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
