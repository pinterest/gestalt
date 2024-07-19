import { create } from 'react-test-renderer';
import Text from './Text';

test('Text renders', () => {
  const tree = create(<Text />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text renders with dataTestId', () => {
  const component = create(<Text dataTestId="some-test-id" />);
  const testInstance = component.root;
  const tooltipElement = testInstance.find(
    (instance: any) => instance.props['data-test-id'] === 'some-test-id',
  );
  expect(tooltipElement).not.toBeNull();
});

test('Text warning adds the warning color class', () => {
  const tree = create(<Text color="warning" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text error adds the error color class', () => {
  const tree = create(<Text color="error" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text size 100 adds the smallest size class', () => {
  const tree = create(<Text size="100" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text lineClamp should add a title when the children are text only', () => {
  const tree = create(
    <Text lineClamp={1}>Shall I compare thee to a summer&#39;s day - William Shakespeare</Text>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text lineClamp should not add a title when the children are objects', () => {
  const tree = create(
    <Text lineClamp={1}>
      <div>Summer reading:</div>
      Shall I compare thee to a summer&#39;s day - William Shakespeare
    </Text>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
