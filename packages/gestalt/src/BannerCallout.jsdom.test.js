// @flow strict
import { render, screen } from '@testing-library/react';
import BannerCallout from './BannerCallout';

test('BannerCallout handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn<[], void>();
  render(
    <BannerCallout
      message="Insert a clever error bannercallout message here"
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: mockOnDismiss,
      }}
      iconAccessibilityLabel="error"
      type="error"
    />,
  );
  screen.getByLabelText('Dismiss banner').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
