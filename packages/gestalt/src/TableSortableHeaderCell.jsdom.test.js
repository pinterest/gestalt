// @flow strict
import { fireEvent, render } from '@testing-library/react';
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
    </table>,
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  getByText('column name').click();
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
    </table>,
  );
  const mockEvent = { charCode: 32, preventDefault: jest.fn<$ReadOnlyArray<$FlowFixMe>, mixed>() };
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  fireEvent.keyPress(getByText('column name'), mockEvent);
  expect(mockOnSortChange).toHaveBeenCalled();
});
