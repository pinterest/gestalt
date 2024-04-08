// @flow strict
import renderer from 'react-test-renderer';
import TableCell from './TableCell';

test('renders correctly', () => {
  const tree = renderer.create(<TableCell>cell content</TableCell>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with colSpan and rowSpan', () => {
  const tree = renderer
    .create(
      <TableCell colSpan={3} rowSpan={2}>
        cell content
      </TableCell>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when sticky and with shadows', () => {
  const tree = renderer
    .create(
      <TableCell previousTotalWidth={120} shouldBeSticky shouldHaveShadow>
        cell content
      </TableCell>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
