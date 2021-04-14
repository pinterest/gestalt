// @flow strict
import { render } from '@testing-library/react';
import InternalLink from './InternalLink.js';

test('InternalLink handles onClick callback', () => {
  const mockOnClick = jest.fn();
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
  getByText('InternalLink').click();
  expect(mockOnClick).toHaveBeenCalled();
});
