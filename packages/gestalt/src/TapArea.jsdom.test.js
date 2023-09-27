// @flow strict
import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TapArea from './TapArea.js';

describe('TapArea', () => {
  it('TapArea handles onTap callback', () => {
    const mockOnTap = jest.fn<
      [
        {|
          dangerouslyDisableOnNavigation: () => void,
          event:
            | SyntheticMouseEvent<HTMLDivElement>
            | SyntheticKeyboardEvent<HTMLDivElement>
            | SyntheticMouseEvent<HTMLAnchorElement>
            | SyntheticKeyboardEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    render(<TapArea onTap={mockOnTap}>TapArea</TapArea>);
    screen.getByText('TapArea').click();
    expect(mockOnTap).toHaveBeenCalled();
  });

  it('TapArea handles onBlur callback', () => {
    const mockOnBlur = jest.fn<
      [
        {|
          event: SyntheticFocusEvent<HTMLDivElement> | SyntheticFocusEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    render(<TapArea onBlur={mockOnBlur}>TapArea</TapArea>);
    fireEvent.focus(screen.getByText('TapArea'));
    fireEvent.blur(screen.getByText('TapArea'));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('TapArea handles onFocus callback', () => {
    const mockOnFocus = jest.fn<
      [
        {|
          event: SyntheticFocusEvent<HTMLDivElement> | SyntheticFocusEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    render(<TapArea onFocus={mockOnFocus}>TapArea</TapArea>);
    fireEvent.focus(screen.getByText('TapArea'));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it('TapArea handles onMouseEnter callback', () => {
    const mockOnMouseEnter = jest.fn<
      [
        {|
          event: SyntheticMouseEvent<HTMLDivElement> | SyntheticMouseEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    render(<TapArea onMouseEnter={mockOnMouseEnter}>TapArea</TapArea>);
    fireEvent.mouseEnter(screen.getByText('TapArea'));
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  it('TapArea handles onMouseLeave callback', () => {
    const mockOnMouseLeave = jest.fn<
      [
        {|
          event: SyntheticMouseEvent<HTMLDivElement> | SyntheticMouseEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    render(<TapArea onMouseLeave={mockOnMouseLeave}>TapArea</TapArea>);
    fireEvent.mouseLeave(screen.getByText('TapArea'));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  it('TapArea handles key press event', () => {
    const mockOnTap = jest.fn<
      [
        {|
          dangerouslyDisableOnNavigation: () => void,
          event:
            | SyntheticMouseEvent<HTMLDivElement>
            | SyntheticKeyboardEvent<HTMLDivElement>
            | SyntheticMouseEvent<HTMLAnchorElement>
            | SyntheticKeyboardEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    render(<TapArea onTap={mockOnTap}>TapArea</TapArea>);
    const mockEvent = {
      charCode: 32,
      preventDefault: jest.fn<$ReadOnlyArray<$FlowFixMe>, mixed>(),
    };
    fireEvent.keyPress(screen.getByText('TapArea'), mockEvent);
    expect(mockOnTap).toHaveBeenCalled();
  });

  it('renders a TapArea with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef<HTMLAnchorElement | HTMLDivElement>();
    render(<TapArea ref={ref} />);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current instanceof HTMLDivElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a link TapArea with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef<HTMLAnchorElement | HTMLDivElement>();
    render(<TapArea role="link" href="http://www.pinterest.com" ref={ref} target="blank" />);
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual(
      'http://www.pinterest.com/',
    );
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a disabled TapArea', () => {
    const ref = createRef<HTMLAnchorElement | HTMLDivElement>();
    render(<TapArea disabled ref={ref} />);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current instanceof HTMLDivElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders a disabled link TapArea', () => {
    const ref = createRef<HTMLAnchorElement | HTMLDivElement>();
    render(
      <TapArea role="link" href="http://www.pinterest.com" disabled ref={ref} target="blank" />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual('');
  });

  it('renders a TapArea removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef<HTMLAnchorElement | HTMLDivElement>();
    render(<TapArea tabIndex={-1} ref={ref} />);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current instanceof HTMLDivElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders a link TapArea removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef<HTMLAnchorElement | HTMLDivElement>();
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

  it('renders a link TapArea with correct new tab announcement with and without accessibilityLabel', () => {
    render(
      <TapArea role="link" target="blank" href="https://www.pinterest.com">
        Visit Pinterest
      </TapArea>,
    );

    expect(
      screen.getByText('Visit Pinterest', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('; Opens a new tab', {
        exact: true,
      }),
    ).toBeVisible();

    render(
      <TapArea
        accessibilityLabel="Visit Pinterest"
        role="link"
        target="blank"
        href="https://www.pinterest.com"
      >
        Visit Pinterest
      </TapArea>,
    );

    expect(screen.getByLabelText('Visit Pinterest; Opens a new tab')).toBeVisible();
  });
});
