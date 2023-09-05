// @flow strict
import { render, screen } from '@testing-library/react';
import Upsell from './Upsell.js';

test('Upsell handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn<[], void>();
  render(
    <Upsell
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
