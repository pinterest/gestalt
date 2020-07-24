// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import Callout from './Callout.js';

test('Callout handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn();
  const { getByLabelText } = render(
    <Callout
      description="Insert a clever error callout message here"
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: mockOnDismiss,
      }}
      iconAccessibilityLabel="error icon"
      style="error"
    />
  );
  getByLabelText('Dismiss banner').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
