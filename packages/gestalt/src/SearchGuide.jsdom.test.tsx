import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import SearchGuide from './SearchGuide';

describe('SearchGuide', () => {
  it('handles click', () => {
    const mockOnClick = jest.fn<
      [
        {
          event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(<SearchGuide onClick={mockOnClick} text="SearchGuideText" />);
    screen.getByText('SearchGuideText').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders a default searchguide with sequential keyboard navigation and forwards a ref to the innermost <searchguide> element', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    // @ts-expect-error - TS2322 - Type 'RefObject<HTMLAnchorElement | HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
    render(<SearchGuide ref={ref} text="test" />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current?.type).toEqual('button');
    expect(ref.current instanceof HTMLButtonElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders with data-test-id', () => {
    const TEST_ID = 'searchguide-test-123';
    render(<SearchGuide dataTestId={TEST_ID} text="Visit Pinterest" />);
    expect(
      screen.getByTestId(TEST_ID, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
