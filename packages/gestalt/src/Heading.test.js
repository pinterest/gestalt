// @flow strict
import { create } from 'react-test-renderer';
import Heading from './Heading.js';

test('Heading large', () => {
  const tree = create(<Heading size="600" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading small with level 3', () => {
  const tree = create(<Heading size="400" accessibilityLevel={3} />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree?.type).toEqual('h3');
});

test('Heading small with level none', () => {
  const tree = create(<Heading size="400" accessibilityLevel="none" />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree?.type).toEqual('div');
});

test('Heading small with id', () => {
  const tree = create(<Heading size="400" id="account-basics" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading default overflow', () => {
  const tree = create(<Heading size="400" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading overflow normal', () => {
  const tree = create(<Heading size="400" overflow="normal" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading lineClamp adds a title when the children are text only', () => {
  const tree = create(<Heading lineClamp={1}>When we two parted - Lord Byron</Heading>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading lineClamp does not add a title when the children are objects', () => {
  const tree = create(
    <Heading lineClamp={1}>
      <div>Breakup reading:</div>
      When we two parted - Lord Byron
    </Heading>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
