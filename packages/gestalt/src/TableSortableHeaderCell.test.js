// @flow strict
import renderer from 'react-test-renderer';
import TableSortableHeaderCell from './TableSortableHeaderCell';

test('renders correctly when inactive', () => {
  const tree = renderer
    .create(
      <TableSortableHeaderCell onSortChange={() => {}} sortOrder="desc" status="inactive">
        column name
      </TableSortableHeaderCell>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when active', () => {
  const tree = renderer
    .create(
      <TableSortableHeaderCell onSortChange={() => {}} sortOrder="asc" status="active">
        column name
      </TableSortableHeaderCell>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('sortable cell has end align', () => {
  const tree = renderer
    .create(
      <TableSortableHeaderCell align="end" onSortChange={() => {}} sortOrder="asc" status="active">
        column name
      </TableSortableHeaderCell>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
