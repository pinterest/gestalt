// @flow strict
import { render } from '@testing-library/react';
import Link from './Link.js';
import OnInteractionProvider from './contexts/OnInteractionProvider.js';

describe('Link', () => {
  it('renders', () => {
    const mockOnClick = jest.fn();

    const { getByText } = render(
      <OnInteractionProvider onInteraction={() => mockOnClick}>
        <Link href="www.pinterest.com">Link</Link>
      </OnInteractionProvider>,
    );

    getByText('Link').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

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
