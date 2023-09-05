// @flow strict
import { fireEvent, render, screen } from '@testing-library/react';
import TableSortableHeaderCell from './TableSortableHeaderCell.js';

test('mouse click calls onSortChange', () => {
  const mockOnSortChange = jest.fn<
    [
      {|
        dangerouslyDisableOnNavigation: () => void,
        event:
          | SyntheticMouseEvent<HTMLDivElement>
          | SyntheticKeyboardEvent<HTMLDivElement>
          | SyntheticMouseEvent<HTMLAnchorElement>
          | SyntheticKeyboardEvent<HTMLAnchorElement>,
      |},
    ],
    void,
  >();
  render(
    <table>
      <thead>
        <tr>
          <TableSortableHeaderCell
            sortOrder="desc"
            status="inactive"
            onSortChange={mockOnSortChange}
          >
            column name
          </TableSortableHeaderCell>
        </tr>
      </thead>
    </table>,
  );
  screen.getByText('column name').click();
  expect(mockOnSortChange).toHaveBeenCalled();
});

test('keypress calls onSortChange', () => {
  const mockOnSortChange = jest.fn<
    [
      {|
        dangerouslyDisableOnNavigation: () => void,
        event:
          | SyntheticMouseEvent<HTMLDivElement>
          | SyntheticKeyboardEvent<HTMLDivElement>
          | SyntheticMouseEvent<HTMLAnchorElement>
          | SyntheticKeyboardEvent<HTMLAnchorElement>,
      |},
    ],
    void,
  >();
  render(
    <table>
      <thead>
        <tr>
          <TableSortableHeaderCell
            sortOrder="desc"
            status="inactive"
            onSortChange={mockOnSortChange}
          >
            column name
          </TableSortableHeaderCell>
        </tr>
      </thead>
    </table>,
  );
  const mockEvent = { charCode: 32, preventDefault: jest.fn<$ReadOnlyArray<$FlowFixMe>, mixed>() };
  fireEvent.keyPress(screen.getByText('column name'), mockEvent);
  expect(mockOnSortChange).toHaveBeenCalled();
});
