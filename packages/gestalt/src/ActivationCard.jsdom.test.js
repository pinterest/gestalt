// @flow strict
import { render, screen } from '@testing-library/react';
import ActivationCard from './ActivationCard.js';

test('ActivationCard handles onDismiss callback', () => {
  const mockOnDismiss = jest.fn<[], void>();
  render(
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
  screen.getByLabelText('Dismiss card').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
