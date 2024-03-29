// @flow strict
import { render, screen } from '@testing-library/react';
import InternalLink from './InternalLink';

test('InternalLink handles onClick callback', () => {
  const mockOnClick = jest.fn<
    [
      {
        dangerouslyDisableOnNavigation: () => void,
        event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      },
    ],
    void,
  >();
  render(
    <InternalLink
      href="https://example.com"
      onClick={mockOnClick}
      tabIndex={0}
      wrappedComponent="button"
    >
      InternalLink
    </InternalLink>,
  );
  screen.getByText('InternalLink').click();
  expect(mockOnClick).toHaveBeenCalled();
});
