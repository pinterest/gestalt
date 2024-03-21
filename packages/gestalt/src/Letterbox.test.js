// @flow strict
import renderer from 'react-test-renderer';
import Letterbox from './Letterbox';

test('Letterbox crops tall content', () => {
  const component = renderer.create(
    <Letterbox contentAspectRatio={564 / 806} height={50} width={50} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Letterbox crops wide content', () => {
  const component = renderer.create(
    <Letterbox contentAspectRatio={564 / 517} height={50} width={50} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Letterbox fits square content', () => {
  const component = renderer.create(
    <Letterbox contentAspectRatio={564 / 564} height={50} width={50} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Letterbox covers square content in a vertical frame', () => {
  const component = renderer.create(
    <Letterbox contentAspectRatio={564 / 564} height={150} width={50} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Letterbox covers square content in a horizontal frame', () => {
  const component = renderer.create(
    <Letterbox contentAspectRatio={564 / 564} height={50} width={150} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
