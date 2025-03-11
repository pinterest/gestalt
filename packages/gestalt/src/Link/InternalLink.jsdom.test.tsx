import { render, screen } from '@testing-library/react';
import InternalLink from './InternalLink';

describe('InternalLink', () => {
  test('InternalLink handles onClick callback', () => {
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
  it('renders with a provided title', () => {
    const TEST_TITLE = 'title with more information';
    render(
      <InternalLink
        href="https://example.com"
        tabIndex={0}
        title={TEST_TITLE}
        wrappedComponent="tapArea"
      >
        InternalLink
      </InternalLink>,
    );
    const anchorTagElement = screen.getByRole('link');
    expect(anchorTagElement.getAttribute('title')).toEqual(TEST_TITLE);
  });
});
