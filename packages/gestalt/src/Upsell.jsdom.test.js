// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import Upsell from './Upsell.js';

test('Upsell handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn();
  const { getByLabelText } = render(
    <Upsell
      message="Insert a clever upsell message here"
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: mockOnDismiss,
      }}
    />,
  );
  getByLabelText('Dismiss banner').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
