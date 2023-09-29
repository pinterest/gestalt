// @flow strict
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import ButtonLink from './ButtonLink.js';

describe('ButtonLink', () => {
  it('handles click', () => {
    const mockOnClick = jest.fn<
      [
        {|
          dangerouslyDisableOnNavigation: () => void,
          event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();

    render(<ButtonLink href="#" text="ButtonText" onClick={mockOnClick} />);

    screen.getByText('ButtonText').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders with correct new tab announcement with and without accessibilityLabel', () => {
    render(
      <ButtonLink
        href="#"
        iconEnd="visit"
        size="lg"
        text="Visit Pinterest"
        rel="nofollow"
        target="blank"
      />,
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
      <ButtonLink
        href="#"
        accessibilityLabel="Visit Pinterest"
        iconEnd="visit"
        size="lg"
        text="Visit Pinterest"
        rel="nofollow"
        target="blank"
      />,
    );

    expect(screen.getByLabelText('Visit Pinterest; Opens a new tab')).toBeVisible();
  });

  it('renders with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(<ButtonLink text="test" href="http://www.pinterest.com" ref={ref} target="blank" />);
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual(
      'http://www.pinterest.com/',
    );
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders disabled', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <ButtonLink text="test" href="http://www.pinterest.com" disabled ref={ref} target="blank" />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual('');
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <ButtonLink
        text="test"
        href="http://www.pinterest.com"
        ref={ref}
        tabIndex={-1}
        target="blank"
      />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders with data-test-id', () => {
    const TEST_ID = 'button-test-123';
    render(
      <ButtonLink
        dataTestId={TEST_ID}
        iconEnd="visit"
        size="lg"
        text="Visit Pinterest"
        rel="nofollow"
        target="blank"
        href="#"
      />,
    );
    expect(
      screen.getByTestId(TEST_ID, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
