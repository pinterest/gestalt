// @flow strict
import { render } from '@testing-library/react';
import Link from './Link.js';

describe('Link', () => {
  test('Link handles onClick callback', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Link href="https://example.com" onClick={mockOnClick}>
        Link
      </Link>,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByText('Link').click();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
