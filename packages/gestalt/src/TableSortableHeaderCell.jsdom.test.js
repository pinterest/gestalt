// @flow strict
import { fireEvent, render, screen } from '@testing-library/react';
import TableSortableHeaderCell from './TableSortableHeaderCell';

test('mouse click calls onSortChange', () => {
  const mockOnSortChange = jest.fn<
    [
      {
        event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
      },
    ],
    void,
  >();
  render(
    <table>
      <thead>
        <tr>
          <TableSortableHeaderCell
            onSortChange={mockOnSortChange}
            sortOrder="desc"
            status="inactive"
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
      {
        event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
      },
    ],
    void,
  >();
  render(
    <table>
      <thead>
        <tr>
          <TableSortableHeaderCell
            onSortChange={mockOnSortChange}
            sortOrder="desc"
            status="inactive"
          >
            column name
          </TableSortableHeaderCell>
        </tr>
      </thead>
    </table>,
  );
  const mockEvent = {
    charCode: 32,
    preventDefault: jest.fn<$ReadOnlyArray<$FlowFixMe>, mixed>(),
  };
  fireEvent.keyPress(screen.getByText('column name'), mockEvent);
  expect(mockOnSortChange).toHaveBeenCalled();
});
