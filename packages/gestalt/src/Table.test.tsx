import renderer from 'react-test-renderer';
import Table from './Table';

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

test('renders with dataTestId', () => {
  const component = renderer.create(
    <Table accessibilityLabel="test" dataTestId="test">
      <div>rest of table</div>
    </Table>,
  ).root;
  expect(
    component
      .findAll((element) => element.type === 'div')
      .filter((node) => node.props['data-test-id'] === 'test'),
  ).toHaveLength(1);
});

test('renders correctly with border', () => {
  const tree = renderer
    .create(
      <Table accessibilityLabel="test" borderStyle="sm">
        <div>rest of table</div>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with maxHeight', () => {
  const tree = renderer
    .create(
      <Table accessibilityLabel="test" maxHeight={100}>
        <div>rest of table</div>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with stickyColumns', () => {
  const tree = renderer
    .create(
      <Table accessibilityLabel="test" stickyColumns={2}>
        <div>rest of table</div>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
