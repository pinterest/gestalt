import { create } from 'react-test-renderer';
import TextUI from './TextUI';

test('TextUI renders', () => {
  const tree = create(<TextUI />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextUI warning adds the warning color class', () => {
  const tree = create(<TextUI color="warning" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextUI error adds the error color class', () => {
  const tree = create(<TextUI color="error" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextUI size 100 adds the smallest size class', () => {
  const tree = create(<TextUI size="xs" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextUI lineClamp should add a title when the children are text only', () => {
  const tree = create(
    <TextUI lineClamp={1}>Shall I compare thee to a summer&#39;s day - William Shakespeare</TextUI>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextUI lineClamp should not add a title when the children are objects', () => {
  const tree = create(
    <TextUI lineClamp={1}>
      <div>Summer reading:</div>
      Shall I compare thee to a summer&#39;s day - William Shakespeare
    </TextUI>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('validate data test id for text', () => {
  const component = create(<TextUI dataTestId="test-text">Testing</TextUI>).root;
  expect(
    component
      .findAll((element) => element.type === 'div')
      .filter((node) => node.props['data-test-id'] === 'test-text'),
  ).toHaveLength(1);
});
