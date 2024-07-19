import { create } from 'react-test-renderer';
import Switch from './Switch';

test('Switch', () => {
  const tree = create(<Switch id="test" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch dataTestId', () => {
  const component = create(<Switch id="test" dataTestId="some-test-id" onChange={() => {}} />);
  const testInstance = component.root;
  const tooltipElement = testInstance.find(
    (instance: any) => instance.props['data-test-id'] === 'some-test-id',
  );
  expect(tooltipElement).not.toBeNull();
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
