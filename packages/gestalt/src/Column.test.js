// @flow strict
import renderer from 'react-test-renderer';
import Column from './Column.js';

test('Column span', () => {
  const component = renderer.create(<Column span={1}>Hello world</Column>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
