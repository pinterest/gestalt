import { render, screen } from '@testing-library/react';
import ActivationCard from './ActivationCard';

test('ActivationCard handles onDismiss callback', () => {
  // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
  const mockOnDismiss = jest.fn<[], undefined>();
  render(
    <ActivationCard
      dismissButton={{
        accessibilityLabel: 'Dismiss card',
        onDismiss: mockOnDismiss,
      }}
      message="We will notify you via email as soon as your site has been successfully claimed"
      status="pending"
      statusMessage="Pending"
      title="Claiming your website"
    />,
  );
  screen.getByLabelText('Dismiss card').click();
  expect(mockOnDismiss).toHaveBeenCalled();
});
