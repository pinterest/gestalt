import { create } from 'react-test-renderer';
import Spinner from './Spinner';

const baseProps = {
  accessibilityLabel: 'Test',
  show: false, // default
} as const;

test('Spinner does not render by default', () => {
  const tree = create(<Spinner {...baseProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Spinner renders when passed show', () => {
  const tree = create(<Spinner {...baseProps} show />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Spinner renders label', () => {
  const tree = create(<Spinner {...baseProps} label="Label" show />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Spinner renders with no delay', () => {
  const tree = create(<Spinner {...baseProps} delay={false} show />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Spinner renders with medium size', () => {
  const tree = create(<Spinner {...baseProps} show size="md" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Spinner renders with small size', () => {
  const tree = create(<Spinner {...baseProps} show size="sm" />).toJSON();
  expect(tree).toMatchSnapshot();
});
