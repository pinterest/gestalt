// @flow strict
import { render } from '@testing-library/react';
import Upsell from './Upsell.js';

test('Upsell handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn<[], void>();
  const { getByLabelText } = render(
    <Upsell
      message="Insert a clever upsell message here"
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: mockOnDismiss,
      }}
    />,
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  getByLabelText('Dismiss banner').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
