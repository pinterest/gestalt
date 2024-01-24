// @flow strict
import { render, screen } from '@testing-library/react';
import BannerUpsell from './BannerUpsell';

test('BannerUpsell handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn<[], void>();
  render(
    <BannerUpsell
      message="Insert a clever upsell message here"
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: mockOnDismiss,
      }}
    />,
  );
  screen.getByLabelText('Dismiss banner').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
