// @flow strict
import renderer from 'react-test-renderer';
import TableBody from './TableBody';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <TableBody>
        <div>rows</div>
      </TableBody>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
