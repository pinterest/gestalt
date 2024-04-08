// @flow strict
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import ButtonLink from './ButtonLink';

describe('ButtonLink', () => {
  it('handles click', () => {
    const mockOnClick = jest.fn<
      [
        {
          dangerouslyDisableOnNavigation: () => void,
          event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
        },
      ],
      void,
    >();

    render(<ButtonLink href="#" onClick={mockOnClick} text="ButtonText" />);

    screen.getByText('ButtonText').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders with correct new tab announcement with and without accessibilityLabel', () => {
    render(
      <ButtonLink
        href="#"
        iconEnd="visit"
        rel="nofollow"
        size="lg"
        target="blank"
        text="Visit Pinterest"
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
        accessibilityLabel="Visit Pinterest"
        href="#"
        iconEnd="visit"
        rel="nofollow"
        size="lg"
        target="blank"
        text="Visit Pinterest"
      />,
    );

    expect(screen.getByLabelText('Visit Pinterest; Opens a new tab')).toBeVisible();
  });

  it('renders with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(<ButtonLink ref={ref} href="http://www.pinterest.com" target="blank" text="test" />);
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual(
      'http://www.pinterest.com/',
    );
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders disabled', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <ButtonLink ref={ref} disabled href="http://www.pinterest.com" target="blank" text="test" />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual('');
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <ButtonLink
        ref={ref}
        href="http://www.pinterest.com"
        tabIndex={-1}
        target="blank"
        text="test"
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
        href="#"
        iconEnd="visit"
        rel="nofollow"
        size="lg"
        target="blank"
        text="Visit Pinterest"
      />,
    );
    expect(
      screen.getByTestId(TEST_ID, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
