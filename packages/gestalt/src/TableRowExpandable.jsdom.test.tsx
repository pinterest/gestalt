import { fireEvent, render, screen } from '@testing-library/react';
import Box from './Box';
import Table from './Table';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableRowExpandable from './TableRowExpandable';
import Text from './Text';

const mockOnExpand = jest.fn<
  [
    {
      event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
      expanded: boolean;
    },
  ],
  // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
  undefined
>();

test('TableRowExpandable handles expand contents call', () => {
  render(
    <Table accessibilityLabel="test">
      <TableBody>
        <TableRowExpandable
          accessibilityCollapseLabel="Collapse"
          accessibilityExpandLabel="Expand"
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
          accessibilityCollapseLabel="Collapse"
          accessibilityExpandLabel="Expand"
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
