// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import TableHeaderCell from './TableHeaderCell.js';

test('renders correctly', () => {
  const tree = renderer
    .create(<TableHeaderCell>column name</TableHeaderCell>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with props', () => {
  const tree = renderer
    .create(
      <TableHeaderCell rowSpan={2} colSpan={3} scope="row">
        row name
      </TableHeaderCell>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
