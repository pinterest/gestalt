import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TapArea from './TapArea';

describe('TapArea', () => {
  it('TapArea handles onTap callback', () => {
    const mockOnTap = jest.fn<
      [
        {
          event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(<TapArea onTap={mockOnTap}>TapArea</TapArea>);
    screen.getByText('TapArea').click();
    expect(mockOnTap).toHaveBeenCalled();
  });

  it('TapArea handles onBlur callback', () => {
    const mockOnBlur = jest.fn<
      [
        {
          event: React.FocusEvent<HTMLDivElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(<TapArea onBlur={mockOnBlur}>TapArea</TapArea>);
    fireEvent.focus(screen.getByText('TapArea'));
    fireEvent.blur(screen.getByText('TapArea'));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('TapArea handles onFocus callback', () => {
    const mockOnFocus = jest.fn<
      [
        {
          event: React.FocusEvent<HTMLDivElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(<TapArea onFocus={mockOnFocus}>TapArea</TapArea>);
    fireEvent.focus(screen.getByText('TapArea'));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it('TapArea handles onMouseEnter callback', () => {
    const mockOnMouseEnter = jest.fn<
      [
        {
          event: React.MouseEvent<HTMLDivElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(<TapArea onMouseEnter={mockOnMouseEnter}>TapArea</TapArea>);
    fireEvent.mouseEnter(screen.getByText('TapArea'));
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  it('TapArea handles onMouseLeave callback', () => {
    const mockOnMouseLeave = jest.fn<
      [
        {
          event: React.MouseEvent<HTMLDivElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(<TapArea onMouseLeave={mockOnMouseLeave}>TapArea</TapArea>);
    fireEvent.mouseLeave(screen.getByText('TapArea'));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  it('TapArea handles key press event', () => {
    const mockOnTap = jest.fn<
      [
        {
          event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(<TapArea onTap={mockOnTap}>TapArea</TapArea>);
    const mockEvent = {
      charCode: 32,
      // @ts-expect-error - TS2344 - Type 'unknown' does not satisfy the constraint 'any[]'.
      preventDefault: jest.fn<ReadonlyArray<any>, unknown>(),
    } as const;
    fireEvent.keyPress(screen.getByText('TapArea'), mockEvent);
    expect(mockOnTap).toHaveBeenCalled();
  });

  it('renders a TapArea with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<TapArea ref={ref}>Text</TapArea>);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current instanceof HTMLDivElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a disabled TapArea', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <TapArea ref={ref} disabled>
        Text
      </TapArea>,
    );
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current instanceof HTMLDivElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders a TapArea removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <TapArea ref={ref} tabIndex={-1}>
        Text
      </TapArea>,
    );
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current instanceof HTMLDivElement && ref.current?.tabIndex).toEqual(-1);
  });
});
