// @flow strict
import { create } from 'react-test-renderer';
import StopScrollBehavior from './StopScrollBehavior';

test('StopScrollBehavior renders', () => {
  const tree = create(<StopScrollBehavior>Hello world</StopScrollBehavior>).toJSON();
  expect(tree).toMatchSnapshot();
});
