import { render, screen } from '@testing-library/react';
import Link from './Link';

describe('Link', () => {
  test('Link handles onClick callback', () => {
    const mockOnClick = jest.fn<
      [
        {
          dangerouslyDisableOnNavigation: () => void;
          event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(
      <Link href="https://example.com" onClick={mockOnClick}>
        Link
      </Link>,
    );
    screen.getByText('Link').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders a link with correct new tab announcement with and without accessibilityLabel', () => {
    render(
      <Link
        display="inline"
        externalLinkIcon="default"
        href="https://business.pinterest.com/advertise"
        target="blank"
      >
        Visit Pinterest
      </Link>,
    );
    expect(
      screen.getByText('Visit Pinterest', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByTitle(', Opens a new tab', {
        exact: true,
      }),
    ).not.toBeVisible();

    render(
      <Link
        accessibilityLabel="Visit Pinterest"
        display="inline"
        externalLinkIcon="default"
        href="https://business.pinterest.com/advertise"
        target="blank"
      />,
    );

    expect(screen.getByLabelText('Visit Pinterest; Opens a new tab')).toBeVisible();
  });

  it('renders with data-test-id', () => {
    const TEST_ID = 'link-test-123';
    render(
      <Link
        accessibilityLabel="Visit Pinterest"
        dataTestId={TEST_ID}
        href="https://business.pinterest.com/advertise"
      />,
    );
    expect(
      screen.getByTestId(TEST_ID, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
