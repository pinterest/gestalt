// @flow strict
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Touchable from './Touchable.js';

test('Touchable handles onTouch callback', () => {
  const mockOnTouch = jest.fn();
  const { getByText } = render(
    <Touchable onTouch={mockOnTouch}>Touchable</Touchable>
  );
  getByText('Touchable').click();
  expect(mockOnTouch).toHaveBeenCalled();
});

test('Touchable handles onBlur callback', () => {
  const mockOnBlur = jest.fn();
  const { getByText } = render(
    <Touchable onBlur={mockOnBlur}>Touchable</Touchable>
  );
  fireEvent.focus(getByText('Touchable'));
  fireEvent.blur(getByText('Touchable'));
  expect(mockOnBlur).toHaveBeenCalled();
});

test('Touchable handles onFocus callback', () => {
  const mockOnFocus = jest.fn();
  const { getByText } = render(
    <Touchable onFocus={mockOnFocus}>Touchable</Touchable>
  );
  fireEvent.focus(getByText('Touchable'));
  expect(mockOnFocus).toHaveBeenCalled();
});

test('Touchable handles onMouseEnter callback', () => {
  const mockOnMouseEnter = jest.fn();
  const { getByText } = render(
    <Touchable onMouseEnter={mockOnMouseEnter}>Touchable</Touchable>
  );
  fireEvent.mouseEnter(getByText('Touchable'));
  expect(mockOnMouseEnter).toHaveBeenCalled();
});

test('Touchable handles onMouseLeave callback', () => {
  const mockOnMouseLeave = jest.fn();
  const { getByText } = render(
    <Touchable onMouseLeave={mockOnMouseLeave}>Touchable</Touchable>
  );
  fireEvent.mouseLeave(getByText('Touchable'));
  expect(mockOnMouseLeave).toHaveBeenCalled();
});

test('Touchable handles key press event', () => {
  const mockOnTouch = jest.fn();
  const { getByText } = render(
    <Touchable onTouch={mockOnTouch}>Touchable</Touchable>
  );
  const mockEvent = { charCode: 32, preventDefault: jest.fn() };
  fireEvent.keyPress(getByText('Touchable'), mockEvent);
  expect(mockOnTouch).toHaveBeenCalled();
});
