import renderer from 'react-test-renderer';
import TableHeaderCell from './TableHeaderCell';

test('renders correctly', () => {
  const tree = renderer.create(<TableHeaderCell>column name</TableHeaderCell>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with props', () => {
  const tree = renderer
    .create(
      <TableHeaderCell colSpan={3} rowSpan={2} scope="row">
        row name
      </TableHeaderCell>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
