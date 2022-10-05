// @flow strict
import renderer from 'react-test-renderer';
import Caret from './Caret.js';

test('Caret renders with direction up', () => {
  const component = renderer.create(<Caret direction="up" height={4} width={12} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Caret renders with direction down', () => {
  const component = renderer.create(<Caret direction="down" height={4} width={12} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Caret renders with direction left', () => {
  const component = renderer.create(<Caret direction="left" height={12} width={4} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Caret renders with direction right', () => {
  const component = renderer.create(<Caret direction="right" height={12} width={4} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
