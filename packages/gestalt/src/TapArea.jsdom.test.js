// @flow strict
import React, { createRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import TapArea from './TapArea.js';

describe('TapArea', () => {
  it('TapArea handles onTap callback', () => {
    const mockOnTap = jest.fn();
    const { getByText } = render(<TapArea onTap={mockOnTap}>TapArea</TapArea>);
    getByText('TapArea').click();
    expect(mockOnTap).toHaveBeenCalled();
  });

  it('TapArea handles onBlur callback', () => {
    const mockOnBlur = jest.fn();
    const { getByText } = render(<TapArea onBlur={mockOnBlur}>TapArea</TapArea>);
    fireEvent.focus(getByText('TapArea'));
    fireEvent.blur(getByText('TapArea'));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('TapArea handles onFocus callback', () => {
    const mockOnFocus = jest.fn();
    const { getByText } = render(<TapArea onFocus={mockOnFocus}>TapArea</TapArea>);
    fireEvent.focus(getByText('TapArea'));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it('TapArea handles onMouseEnter callback', () => {
    const mockOnMouseEnter = jest.fn();
    const { getByText } = render(<TapArea onMouseEnter={mockOnMouseEnter}>TapArea</TapArea>);
    fireEvent.mouseEnter(getByText('TapArea'));
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  it('TapArea handles onMouseLeave callback', () => {
    const mockOnMouseLeave = jest.fn();
    const { getByText } = render(<TapArea onMouseLeave={mockOnMouseLeave}>TapArea</TapArea>);
    fireEvent.mouseLeave(getByText('TapArea'));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  it('TapArea handles key press event', () => {
    const mockOnTap = jest.fn();
    const { getByText } = render(<TapArea onTap={mockOnTap}>TapArea</TapArea>);
    const mockEvent = { charCode: 32, preventDefault: jest.fn() };
    fireEvent.keyPress(getByText('TapArea'), mockEvent);
    expect(mockOnTap).toHaveBeenCalled();
  });

  it('renders a TapArea with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef();
    render(<TapArea ref={ref} />);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current instanceof HTMLDivElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a link TapArea with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef();
    render(<TapArea role="link" href="http://www.pinterest.com" ref={ref} target="blank" />);
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual(
      'http://www.pinterest.com/',
    );
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a disabled TapArea', () => {
    const ref = createRef();
    render(<TapArea disabled ref={ref} />);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current instanceof HTMLDivElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders a disabled link TapArea', () => {
    const ref = createRef();
    render(
      <TapArea role="link" href="http://www.pinterest.com" disabled ref={ref} target="blank" />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual('');
  });

  it('renders a TapArea removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef();
    render(<TapArea tabIndex={-1} ref={ref} />);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current instanceof HTMLDivElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders a link TapArea removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef();
    render(
      <TapArea
        role="link"
        href="http://www.pinterest.com"
        tabIndex={-1}
        ref={ref}
        target="blank"
      />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(-1);
  });
});
