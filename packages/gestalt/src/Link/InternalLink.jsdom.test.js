// @flow strict
import { render } from '@testing-library/react';
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
  const { getByText } = render(
    <InternalLink
      wrappedComponent="button"
      href="https://example.com"
      onClick={mockOnClick}
      tabIndex={0}
    >
      InternalLink
    </InternalLink>,
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  getByText('InternalLink').click();
  expect(mockOnClick).toHaveBeenCalled();
});
