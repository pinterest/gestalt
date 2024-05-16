import {render, screen} from '@testing-library/react';
import BannerUpsell from './BannerUpsell';

test('BannerUpsell handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn<[], undefined>();
  render(
    <BannerUpsell
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: mockOnDismiss,
      }}
      message="Insert a clever upsell message here"
    />,
  );
  screen.getByLabelText('Dismiss banner').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
