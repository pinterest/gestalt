// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import TableCell from './TableCell.js';

test('renders correctly', () => {
  const tree = renderer.create(<TableCell>cell content</TableCell>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with colSpan and rowSpan', () => {
  const tree = renderer
    .create(
      <TableCell rowSpan={2} colSpan={3}>
        cell content
      </TableCell>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when sticky and with shadows', () => {
  const tree = renderer
    .create(
      <TableCell shouldBeSticky shouldHaveShadow previousTotalWidth={120}>
        cell content
      </TableCell>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
