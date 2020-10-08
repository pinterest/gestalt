// @flow strict
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Box from './Box.js';
import Table from './Table.js';
import TableBody from './TableBody.js';
import TableCell from './TableCell.js';
import TableRowExpandable from './TableRowExpandable.js';
import Text from './Text.js';

test('TableRowExpandable handles onMouseEnter callback', () => {
  const { getByText } = render(
    <Table>
      <TableBody>
        <TableRowExpandable
          accessibilityExpandLabel="Expand"
          accessibilityCollapseLabel="Collapse"
          expandedContents={<Box>Hello</Box>}
        >
          <TableCell>
            <Text>Row Info</Text>
          </TableCell>
        </TableRowExpandable>
      </TableBody>
    </Table>
  );
  expect(() => {
    getByText('Hello');
  }).toThrow('Unable to find an element with the text: Hello');
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(getByText('Hello')).toBeTruthy();
});
