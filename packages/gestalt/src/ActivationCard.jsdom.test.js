// @flow strict
import { render } from '@testing-library/react';
import ActivationCard from './ActivationCard.js';

test('ActivationCard handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn<[], void>();
  const { getByLabelText } = render(
    <ActivationCard
      status="pending"
      statusMessage="Pending"
      title="Claiming your website"
      message="We will notify you via email as soon as your site has been successfully claimed"
      dismissButton={{
        accessibilityLabel: 'Dismiss card',
        onDismiss: mockOnDismiss,
      }}
    />,
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  getByLabelText('Dismiss card').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
