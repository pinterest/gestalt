// @flow strict
import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TapAreaLink from './TapAreaLink.js';

describe('TapAreaLink', () => {
  it('TapAreaLink handles onTap', () => {
    const mockOnTap = jest.fn<
      [
        {|
          dangerouslyDisableOnNavigation: () => void,
          event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();

    render(
      <TapAreaLink href="#" onTap={mockOnTap}>
        TapAreaLink
      </TapAreaLink>,
    );

    screen.getByText('TapAreaLink').click();
    expect(mockOnTap).toHaveBeenCalled();
  });

  it('TapAreaLink handles onBlur callback', () => {
    const mockOnBlur = jest.fn<
      [
        {|
          event: SyntheticFocusEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();

    render(
      <TapAreaLink href="#" onBlur={mockOnBlur}>
        TapAreaLink
      </TapAreaLink>,
    );

    fireEvent.focus(screen.getByText('TapAreaLink'));

    fireEvent.blur(screen.getByText('TapAreaLink'));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('TapAreaLink handles onFocus callback', () => {
    const mockOnFocus = jest.fn<
      [
        {|
          event: SyntheticFocusEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();

    render(
      <TapAreaLink href="#" onFocus={mockOnFocus}>
        TapAreaLink
      </TapAreaLink>,
    );

    fireEvent.focus(screen.getByText('TapAreaLink'));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it('TapAreaLink handles onMouseEnter callback', () => {
    const mockOnMouseEnter = jest.fn<
      [
        {|
          event: SyntheticMouseEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();

    render(
      <TapAreaLink href="#" onMouseEnter={mockOnMouseEnter}>
        TapAreaLink
      </TapAreaLink>,
    );

    fireEvent.mouseEnter(screen.getByText('TapAreaLink'));
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  it('TapAreaLink handles onMouseLeave callback', () => {
    const mockOnMouseLeave = jest.fn<
      [
        {|
          event: SyntheticMouseEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    render(
      <TapAreaLink href="#" onMouseLeave={mockOnMouseLeave}>
        TapAreaLink
      </TapAreaLink>,
    );

    fireEvent.mouseLeave(screen.getByText('TapAreaLink'));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  it('TapAreaLink handles key press event', () => {
    const mockOnTap = jest.fn<
      [
        {|
          dangerouslyDisableOnNavigation: () => void,
          event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    render(
      <TapAreaLink href="#" onTap={mockOnTap}>
        TapAreaLink
      </TapAreaLink>,
    );
    const mockEvent = {
      charCode: 32,
      preventDefault: jest.fn<$ReadOnlyArray<$FlowFixMe>, mixed>(),
    };
    fireEvent.keyPress(screen.getByText('TapAreaLink'), mockEvent);
    expect(mockOnTap).toHaveBeenCalled();
  });

  it('renders with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <TapAreaLink href="http://www.pinterest.com" ref={ref} target="blank">
        TapAreaLink
      </TapAreaLink>,
    );

    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual(
      'http://www.pinterest.com/',
    );
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders disabled', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <TapAreaLink href="#" disabled ref={ref}>
        TapAreaLink
      </TapAreaLink>,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual('');

    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <TapAreaLink href="#" tabIndex={-1} ref={ref}>
        TapAreaLink
      </TapAreaLink>,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders with correct new tab announcement with and without accessibilityLabel', () => {
    render(
      <TapAreaLink target="blank" href="https://www.pinterest.com">
        Visit Pinterest
      </TapAreaLink>,
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
      <TapAreaLink
        accessibilityLabel="Visit Pinterest"
        target="blank"
        href="https://www.pinterest.com"
      >
        Visit Pinterest
      </TapAreaLink>,
    );

    expect(screen.getByLabelText('Visit Pinterest; Opens a new tab')).toBeVisible();
  });

  it('renders with data-test-id', () => {
    const TEST_ID = 'button-test-123';
    render(
      <TapAreaLink
        accessibilityLabel="Visit Pinterest"
        target="blank"
        href="https://www.pinterest.com"
        dataTestId={TEST_ID}
      >
        Visit Pinterest
      </TapAreaLink>,
    );
    expect(
      screen.getByTestId(TEST_ID, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
