// @flow strict
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TableSortableHeaderCell from './TableSortableHeaderCell.js';

test('mouse click calls onSortChange', () => {
  const mockOnSortChange = jest.fn();
  const { getByText } = render(
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
    </table>
  );
  getByText('column name').click();
  expect(mockOnSortChange).toHaveBeenCalled();
});

test('keypress calls onSortChange', () => {
  const mockOnSortChange = jest.fn();
  const { getByText } = render(
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
    </table>
  );
  const mockEvent = { charCode: 32, preventDefault: jest.fn() };
  fireEvent.keyPress(getByText('column name'), mockEvent);
  expect(mockOnSortChange).toHaveBeenCalled();
});
