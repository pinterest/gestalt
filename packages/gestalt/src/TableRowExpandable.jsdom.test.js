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
    {|
      event:
        | SyntheticMouseEvent<HTMLButtonElement>
        | SyntheticKeyboardEvent<HTMLButtonElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>,
      expanded: boolean,
    |},
  ],
  void,
>();

test('TableRowExpandable handles expand contents call', () => {
  const { getByText } = render(
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
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByText('Hello');
  }).toThrow('Unable to find an element with the text: Hello');
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(mockOnExpand).toHaveBeenCalledTimes(0);
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  expect(getByText('Hello')).toBeTruthy();
});

test('TableRowExpandable handles onExpand callback', () => {
  const { getByText } = render(
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
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByText('Hello');
  }).toThrow('Unable to find an element with the text: Hello');
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(mockOnExpand).toHaveBeenCalled();
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  expect(getByText('Hello')).toBeTruthy();
});
