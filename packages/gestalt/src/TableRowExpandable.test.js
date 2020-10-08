// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import TableRowExpandable from './TableRowExpandable.js';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <TableRowExpandable expandedContents={<div>Expanded Contents</div>}>
        <div>row cells</div>
      </TableRowExpandable>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with explicit hover', () => {
  const tree = renderer
    .create(
      <TableRowExpandable
        hoverStyle="gray"
        expandedContents={<div>Expanded Contents</div>}
      >
        <div>row cells</div>
      </TableRowExpandable>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without hover', () => {
  const tree = renderer
    .create(
      <TableRowExpandable
        hoverStyle="none"
        expandedContents={<div>Expanded Contents</div>}
      >
        <div>row cells</div>
      </TableRowExpandable>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
