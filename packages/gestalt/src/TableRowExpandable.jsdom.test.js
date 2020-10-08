// @flow strict
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Box from './Box.js';
import TableCell from './TableCell.js';
import TableRowExpandable from './TableRowExpandable.js';
import Text from './Text.js';

test('TableRowExpandable handles onMouseEnter callback', () => {
  const { getByText } = render(
    <TableRowExpandable expandedContents={<Box>Hello</Box>}>
      <TableCell>
        <Text>Row Info</Text>
      </TableCell>
    </TableRowExpandable>
  );
  fireEvent.mouseEnter(getByText('Row Info'));
  expect.objectContaining({
    hoverStyle: 'gray',
  });
});

test('TableRowExpandable handles onMouseLeave callback', () => {
  const { getByText } = render(
    <TableRowExpandable expandedContents={<Box>Hello</Box>}>
      <TableCell>
        <Text>Row Info</Text>
      </TableCell>
    </TableRowExpandable>
  );
  fireEvent.mouseLeave(getByText('Row Info'));
  expect.objectContaining({
    hoverStyle: 'gray',
  });
});
