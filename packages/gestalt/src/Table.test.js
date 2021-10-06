// @flow strict
import renderer from 'react-test-renderer';
import Table from './Table.js';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Table accessibilityLabel="test">
        <div>rest of table</div>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with border', () => {
  const tree = renderer
    .create(
      <Table borderStyle="sm" accessibilityLabel="test">
        <div>rest of table</div>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with maxHeight', () => {
  const tree = renderer
    .create(
      <Table maxHeight={100} accessibilityLabel="test">
        <div>rest of table</div>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with stickyColumns', () => {
  const tree = renderer
    .create(
      <Table stickyColumns={2} accessibilityLabel="test">
        <div>rest of table</div>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
