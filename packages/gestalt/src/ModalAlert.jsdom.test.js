// @flow strict
import { render } from '@testing-library/react';
import ModalAlert from './ModalAlert.js';

const mockOnDismiss = jest.fn();

describe('Modal', () => {
  if (typeof document !== 'undefined') {
    test('Modal renders', () => {
      const { baseElement } = render(
        <ModalAlert
          heading="Delete Pin?"
          accessibilityModalLabel="Test modal"
          onDismiss={mockOnDismiss}
          primaryAction={{
            accessibilityLabel: 'Acknowledge expired card',
            label: 'Got it',
            onClick: () => {},
          }}
        >
          Modal content
        </ModalAlert>,
      );

      expect(baseElement).toMatchSnapshot();
    });
  }
});
