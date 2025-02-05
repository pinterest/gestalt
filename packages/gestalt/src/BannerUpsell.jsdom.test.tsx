import { render, screen } from '@testing-library/react';
import BannerUpsell from './BannerUpsell';

test('BannerUpsell handles onDismiss callback', () => {
  // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
  const mockOnDismiss = jest.fn<[], undefined>();
  render(
    <BannerUpsell
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: mockOnDismiss,
      }}
      message="Insert a clever upsell message here"
      title="title"
    />,
  );
  screen.getByLabelText('Dismiss banner').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
