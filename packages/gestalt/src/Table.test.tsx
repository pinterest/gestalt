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
  const component = renderer
    .create(
      <Table accessibilityLabel="test" dataTestId="some-test-id" >
        <div>rest of table</div>
      </Table>,
    );
    const testInstance = component.root;
    const tooltipElement = testInstance.find((instance:any) => instance.props['data-test-id'] === 'some-test-id');
    expect(tooltipElement).not.toBeNull();
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
