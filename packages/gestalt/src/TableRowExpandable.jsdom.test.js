// @flow strict
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Box from './Box.js';
import TableRowExpandable from './TableRowExpandable.js';

test('TableRowExpandable handles onMouseEnter callback', () => {
  const { getByText } = render(
    <TableRowExpandable expandedContents={<Box>Hello</Box>}>
      Row Info
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
      Row Info
    </TableRowExpandable>
  );
  fireEvent.mouseLeave(getByText('Row Info'));
  expect.objectContaining({
    hoverStyle: 'gray',
  });
});
