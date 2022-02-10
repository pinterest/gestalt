// @flow strict
import { create } from 'react-test-renderer';
import Text from './Text.js';

test('Text renders', () => {
  const tree = create(<Text />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text orange adds the orange color class', () => {
  const tree = create(<Text color="orange" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text size 100 adds the smallest size class', () => {
  const tree = create(<Text size="100" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Deprecated Text size sm adds the small size class', () => {
  const tree = create(<Text size="sm" />).toJSON();
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
