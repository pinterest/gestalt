// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import Callout from './Callout.js';

test('Callout handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn();
  const { getByLabelText } = render(
    <Callout
      description="Insert a clever error callout message here"
      dismissIconAccessibilityLabel="Dismiss banner"
      iconAccessibilityLabel="error icon"
      onDismiss={mockOnDismiss}
      style="error"
    />
  );
  getByLabelText('Dismiss banner').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
