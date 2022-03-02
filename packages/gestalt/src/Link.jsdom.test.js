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
    getByText('Link').click();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
