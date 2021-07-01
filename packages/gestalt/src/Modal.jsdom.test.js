// @flow strict
import { render } from '@testing-library/react';
import Modal from './Modal.js';

const mockOnDismiss = jest.fn();

describe('Modal', () => {
  if (typeof document !== 'undefined') {
    test('Modal renders', () => {
      const modal = render(
        <Modal accessibilityModalLabel="Test modal" onDismiss={mockOnDismiss}>
          Modal content
        </Modal>,
      );

      expect(modal).toMatchSnapshot();
    });
  }
});
