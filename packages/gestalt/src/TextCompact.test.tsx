import { create } from 'react-test-renderer';
import TextCompact from './TextCompact';

test('TextCompact renders', () => {
  const tree = create(<TextCompact />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextCompact warning adds the warning color class', () => {
  const tree = create(<TextCompact color="warning" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextCompact error adds the error color class', () => {
  const tree = create(<TextCompact color="error" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextCompact emphasis style renders', () => {
  const tree = create(<TextCompact weight="emphasis" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextCompact lineClamp should add a title when the children are text only', () => {
  const tree = create(
    <TextCompact lineClamp={1}>
      Shall I compare thee to a summer&#39;s day - William Shakespeare
    </TextCompact>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextCompact lineClamp should not add a title when the children are objects', () => {
  const tree = create(
    <TextCompact lineClamp={1}>
      <div>Summer reading:</div>
      Shall I compare thee to a summer&#39;s day - William Shakespeare
    </TextCompact>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('validate data test id for text', () => {
  const component = create(<TextCompact dataTestId="test-text">Testing</TextCompact>).root;
  expect(
    component
      .findAll((element) => element.type === 'div')
      .filter((node) => node.props['data-test-id'] === 'test-text'),
  ).toHaveLength(1);
});
