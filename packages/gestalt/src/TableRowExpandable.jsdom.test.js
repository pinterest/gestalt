// @flow strict
import { fireEvent, render, screen } from '@testing-library/react';
import Box from './Box.js';
import Table from './Table.js';
import TableBody from './TableBody.js';
import TableCell from './TableCell.js';
import TableRowExpandable from './TableRowExpandable.js';
import Text from './Text.js';

const mockOnExpand = jest.fn<
  [
    {
      event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement>,
      expanded: boolean,
    },
  ],
  void,
>();

test('TableRowExpandable handles expand contents call', () => {
  render(
    <Table accessibilityLabel="test">
      <TableBody>
        <TableRowExpandable
          accessibilityExpandLabel="Expand"
          accessibilityCollapseLabel="Collapse"
          expandedContents={<Box>Hello</Box>}
          id="expandableRow"
        >
          <TableCell>
            <Text>Row Info</Text>
          </TableCell>
        </TableRowExpandable>
      </TableBody>
    </Table>,
  );
  expect(() => {
    screen.getByText('Hello');
  }).toThrow('Unable to find an element with the text: Hello');
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(mockOnExpand).toHaveBeenCalledTimes(0);
  expect(screen.getByText('Hello')).toBeTruthy();
});

test('TableRowExpandable handles onExpand callback', () => {
  render(
    <Table accessibilityLabel="test">
      <TableBody>
        <TableRowExpandable
          accessibilityExpandLabel="Expand"
          accessibilityCollapseLabel="Collapse"
          expandedContents={<Box>Hello</Box>}
          id="expandableRow"
          onExpand={mockOnExpand}
        >
          <TableCell>
            <Text>Row Info</Text>
          </TableCell>
        </TableRowExpandable>
      </TableBody>
    </Table>,
  );
  expect(() => {
    screen.getByText('Hello');
  }).toThrow('Unable to find an element with the text: Hello');
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(mockOnExpand).toHaveBeenCalled();
  expect(screen.getByText('Hello')).toBeTruthy();
});
