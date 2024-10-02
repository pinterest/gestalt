import { create } from 'react-test-renderer';
import Text from './Text';

test('Text renders', () => {
  const tree = create(<Text />).toJSON();
  expect(tree).toMatchSnapshot();
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

test('validate data test id for text', () => {
  const component = create(<Text dataTestId="test-text">Testing</Text>).root;
  expect(
    component
      .findAll((element) => element.type === 'div')
      .filter((node) => node.props['data-test-id'] === 'test-text'),
  ).toHaveLength(1);
});
