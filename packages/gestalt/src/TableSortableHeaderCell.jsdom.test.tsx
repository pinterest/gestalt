import {fireEvent, render, screen} from '@testing-library/react';
import TableSortableHeaderCell from './TableSortableHeaderCell';

test('mouse click calls onSortChange', () => {
  const mockOnSortChange = jest.fn<[{
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  }], undefined>();
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
  const mockOnSortChange = jest.fn<[{
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  }], undefined>();
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
    preventDefault: jest.fn<ReadonlyArray<any>, unknown>(),
  } as const;
  fireEvent.keyPress(screen.getByText('column name'), mockEvent);
  expect(mockOnSortChange).toHaveBeenCalled();
});
