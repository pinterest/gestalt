// @flow strict
import renderer from 'react-test-renderer';
import TableSortableHeaderCell from './TableSortableHeaderCell.js';

test('renders correctly when inactive', () => {
  const tree = renderer
    .create(
      <TableSortableHeaderCell sortOrder="desc" status="inactive" onSortChange={() => {}}>
        column name
      </TableSortableHeaderCell>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when active', () => {
  const tree = renderer
    .create(
      <TableSortableHeaderCell sortOrder="asc" status="active" onSortChange={() => {}}>
        column name
      </TableSortableHeaderCell>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('sortable cell has end align', () => {
  const tree = renderer
    .create(
      <TableSortableHeaderCell align="end" sortOrder="asc" status="active" onSortChange={() => {}}>
        column name
      </TableSortableHeaderCell>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
