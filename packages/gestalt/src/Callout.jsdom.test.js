// @flow strict
import { render, screen } from '@testing-library/react';
import Callout from './Callout.js';

test('Callout handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn<[], void>();
  render(
    <Callout
      message="Insert a clever error callout message here"
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
