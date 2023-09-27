// @flow strict
import { render, screen } from '@testing-library/react';
import InternalLink from './InternalLink.js';

test('InternalLink handles onClick callback', () => {
  const mockOnClick = jest.fn<
    [
      {|
        dangerouslyDisableOnNavigation: () => void,
        event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      |},
    ],
    void,
  >();
  render(
    <InternalLink
      wrappedComponent="button"
      href="https://example.com"
      onClick={mockOnClick}
      tabIndex={0}
    >
      InternalLink
    </InternalLink>,
  );
  screen.getByText('InternalLink').click();
  expect(mockOnClick).toHaveBeenCalled();
});
