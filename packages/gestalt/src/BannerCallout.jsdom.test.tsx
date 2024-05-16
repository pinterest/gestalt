import { render, screen } from '@testing-library/react';
import BannerCallout from './BannerCallout';

test('BannerCallout handles onDismiss callback', () => {
  // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
  const mockOnDismiss = jest.fn<[], undefined>();
  render(
    <BannerCallout
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: mockOnDismiss,
      }}
      iconAccessibilityLabel="error"
      message="Insert a clever error bannercallout message here"
      type="error"
    />,
  );
  screen.getByLabelText('Dismiss banner').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
