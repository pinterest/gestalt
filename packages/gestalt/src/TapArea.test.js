// @flow strict
import { create } from 'react-test-renderer';
import TapArea from './TapArea';

test('TapArea renders', () => {
  const tree = create(<TapArea onTap={() => {}}>TapArea</TapArea>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TapArea sets correct mouse cursor', () => {
  const tree = create(
    <TapArea mouseCursor="zoomIn" onTap={() => {}}>
      TapArea
    </TapArea>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TapArea sets correct rounding', () => {
  const tree = create(
    <TapArea onTap={() => {}} rounding="circle">
      TapArea
    </TapArea>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TapArea sets fullWidth correctly', () => {
  const tree = create(
    <TapArea fullWidth={false} onTap={() => {}}>
      TapArea
    </TapArea>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TapArea sets fullHeight correctly', () => {
  const tree = create(
    <TapArea fullHeight onTap={() => {}}>
      TapArea
    </TapArea>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TapArea supports press style', () => {
  const tree = create(
    <TapArea onTap={() => {}} tapStyle="compress">
      TapArea
    </TapArea>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('accessibilityControls', () => {
  const instance = create(
    <TapArea accessibilityControls="another-element" onTap={() => {}}>
      TapArea
    </TapArea>,
  ).root;
  expect(
    instance.find((element) => element.type === 'div' && element.props.role === 'button').props[
      'aria-controls'
    ],
  ).toContain('another-element');
});

test('accessibilityExpanded', () => {
  const instance = create(
    <TapArea accessibilityExpanded onTap={() => {}}>
      TapArea
    </TapArea>,
  ).root;
  expect(
    instance.find((element) => element.type === 'div' && element.props.role === 'button').props[
      'aria-expanded'
    ],
  ).toBe(true);
});

test('accessibilityHaspopup', () => {
  const instance = create(
    <TapArea accessibilityHaspopup onTap={() => {}}>
      TapArea
    </TapArea>,
  ).root;
  expect(
    instance.find((element) => element.type === 'div' && element.props.role === 'button').props[
      'aria-haspopup'
    ],
  ).toBe(true);
});

test('accessibilityLabel', () => {
  const instance = create(
    <TapArea accessibilityLabel="hello" onTap={() => {}}>
      TapArea
    </TapArea>,
  ).root;
  expect(
    instance.find((element) => element.type === 'div' && element.props.role === 'button').props[
      'aria-label'
    ],
  ).toContain('hello');
});
