import { create } from 'react-test-renderer';
import Icon from './Icon';

test('Icon renders', () => {
  const tree = create(<Icon accessibilityLabel="Add" icon="add" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon has correct aria-hidden property applied when accessibilityLabel is an empty string', () => {
  const tree = create(<Icon accessibilityLabel="" icon="add" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon uses the dangerouslySetSvgPath prop when icon path is not specified', () => {
  const tree = create(
    <Icon accessibilityLabel="Line" dangerouslySetSvgPath={{ __path: 'M13.00,20.00' }} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon flipped if its in the flip on rtl list', () => {
  const tree = create(<Icon accessibilityLabel="send" icon="send" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon renders with dataTestId', () => {
  const component = create(
    <Icon accessibilityLabel="send" dataTestId="data-test-id-csoft" icon="send" />,
  ).root;
  expect(
    component
      .findAll((element) => element.type === 'svg')
      .filter((node) => node.props['data-test-id'] === 'data-test-id-csoft'),
  ).toHaveLength(1);
});
