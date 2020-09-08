// @flow strict
import React, { createRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import TapArea from './TapArea.js';

test('TapArea handles onTap callback', () => {
  const mockOnTap = jest.fn();
  const { getByText } = render(<TapArea onTap={mockOnTap}>TapArea</TapArea>);
  getByText('TapArea').click();
  expect(mockOnTap).toHaveBeenCalled();
});

test('TapArea handles onBlur callback', () => {
  const mockOnBlur = jest.fn();
  const { getByText } = render(<TapArea onBlur={mockOnBlur}>TapArea</TapArea>);
  fireEvent.focus(getByText('TapArea'));
  fireEvent.blur(getByText('TapArea'));
  expect(mockOnBlur).toHaveBeenCalled();
});

test('TapArea handles onFocus callback', () => {
  const mockOnFocus = jest.fn();
  const { getByText } = render(
    <TapArea onFocus={mockOnFocus}>TapArea</TapArea>
  );
  fireEvent.focus(getByText('TapArea'));
  expect(mockOnFocus).toHaveBeenCalled();
});

test('TapArea handles onMouseEnter callback', () => {
  const mockOnMouseEnter = jest.fn();
  const { getByText } = render(
    <TapArea onMouseEnter={mockOnMouseEnter}>TapArea</TapArea>
  );
  fireEvent.mouseEnter(getByText('TapArea'));
  expect(mockOnMouseEnter).toHaveBeenCalled();
});

test('TapArea handles onMouseLeave callback', () => {
  const mockOnMouseLeave = jest.fn();
  const { getByText } = render(
    <TapArea onMouseLeave={mockOnMouseLeave}>TapArea</TapArea>
  );
  fireEvent.mouseLeave(getByText('TapArea'));
  expect(mockOnMouseLeave).toHaveBeenCalled();
});

test('TapArea handles key press event', () => {
  const mockOnTap = jest.fn();
  const { getByText } = render(<TapArea onTap={mockOnTap}>TapArea</TapArea>);
  const mockEvent = { charCode: 32, preventDefault: jest.fn() };
  fireEvent.keyPress(getByText('TapArea'), mockEvent);
  expect(mockOnTap).toHaveBeenCalled();
});

it('renders a link TapArea and forwards a ref to the innermost <a> element', () => {
  const ref = createRef();
  render(
    <TapArea
      role="link"
      href="http://www.pinterest.com"
      ref={ref}
      target="blank"
    />
  );
  expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
  expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual(
    'http://www.pinterest.com/'
  );
});

it('renders a disabled link TapArea', () => {
  const ref = createRef();
  render(
    <TapArea
      role="link"
      href="http://www.pinterest.com"
      disabled
      ref={ref}
      target="blank"
    />
  );
  expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
  expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual(
    ''
  );
});
