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
  const idName = 'data-test-id-csoft';
  const instance = create(<Icon accessibilityLabel="send" dataTestId={idName} icon="send" />).root;
  expect(instance.find((element: any) => element.type === 'svg').props['data-test-id']).toContain(
    idName,
  );
});
