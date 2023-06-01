// @flow strict
import { screen, render } from '@testing-library/react';
import Link from './Link.js';

describe('Link', () => {
  test('Link handles onClick callback', () => {
    const mockOnClick = jest.fn<
      [
        {|
          dangerouslyDisableOnNavigation: () => void,
          event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    const { getByText } = render(
      <Link href="https://example.com" onClick={mockOnClick}>
        Link
      </Link>,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByText('Link').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders a link with correct new tab announcement with and without accessibilityLabel', () => {
    render(
      <Link
        href="https://business.pinterest.com/advertise"
        display="inline"
        externalLinkIcon="default"
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
      screen.getByText('; Opens a new tab', {
        exact: true,
      }),
    ).toBeVisible();

    render(
      <Link
        accessibilityLabel="Visit Pinterest"
        href="https://business.pinterest.com/advertise"
        display="inline"
        externalLinkIcon="default"
        target="blank"
      />,
    );

    expect(screen.getByLabelText('Visit Pinterest; Opens a new tab')).toBeVisible();
  });
});
