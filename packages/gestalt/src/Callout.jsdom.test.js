// @flow strict
import { render } from '@testing-library/react';
import Callout from './Callout.js';

test('Callout handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn<[], void>();
  const { getByLabelText } = render(
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
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  getByLabelText('Dismiss banner').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
