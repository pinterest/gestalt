// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import Touchable from './Touchable.js';

test('Touchable renders', () => {
  const tree = create(
    <Touchable onTouch={() => {}}>Touchable</Touchable>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Touchable sets correct mouse cursor', () => {
  const tree = create(
    <Touchable onTouch={() => {}} mouseCursor="zoomIn">
      Touchable
    </Touchable>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Touchable sets correct shape', () => {
  const tree = create(
    <Touchable onTouch={() => {}} shape="circle">
      Touchable
    </Touchable>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Touchable sets fullWidth correctly', () => {
  const tree = create(
    <Touchable onTouch={() => {}} fullWidth={false}>
      Touchable
    </Touchable>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Touchable sets fullHeight correctly', () => {
  const tree = create(
    <Touchable onTouch={() => {}} fullHeight>
      Touchable
    </Touchable>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Touchable handles onTouch callback', () => {
  const mockOnTouch = jest.fn();
  const wrapper = shallow(
    <Touchable onTouch={mockOnTouch}>Touchable</Touchable>
  );
  wrapper.simulate('click');
  expect(mockOnTouch).toBeCalled();
});

test('Touchable handles onMouseEnter callback', () => {
  const mockOnMouseEnter = jest.fn();
  const wrapper = shallow(
    <Touchable onMouseEnter={mockOnMouseEnter}>Touchable</Touchable>
  );
  wrapper.simulate('mouseEnter');
  expect(mockOnMouseEnter).toBeCalled();
});

test('Touchable handles onMouseLeave callback', () => {
  const mockOnMouseLeave = jest.fn();
  const wrapper = shallow(
    <Touchable onMouseLeave={mockOnMouseLeave}>Touchable</Touchable>
  );
  wrapper.simulate('mouseLeave');
  expect(mockOnMouseLeave).toBeCalled();
});

test('Touchable handles key press event', () => {
  const mockOnTouch = jest.fn();
  const wrapper = shallow(
    <Touchable onTouch={mockOnTouch}>Touchable</Touchable>
  );
  const mockEvent = { charCode: 32, preventDefault: jest.fn() };
  wrapper.simulate('keyPress', mockEvent);
  expect(mockOnTouch).toBeCalled();
});
