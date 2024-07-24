import { create } from 'react-test-renderer';
import Switch from './Switch';

test('Switch', () => {
  const tree = create(<Switch id="test" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch dataTestId', () => {
  const component = create(<Switch dataTestId="test" id="test" onChange={() => {}} />).root;
  expect(
    component
      .findAll((element) => element.type === 'input')
      .filter((node) => node.props['data-test-id'] === 'test'),
  ).toHaveLength(1);
});

test('Switch disabled', () => {
  const tree = create(<Switch disabled id="test" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch switched', () => {
  const tree = create(<Switch id="test" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch switched & disabled', () => {
  const tree = create(<Switch disabled id="test" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
