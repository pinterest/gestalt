// @flow strict
import renderer from 'react-test-renderer';
import TableRow from './TableRow';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <TableRow>
        <div>row cells</div>
      </TableRow>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
