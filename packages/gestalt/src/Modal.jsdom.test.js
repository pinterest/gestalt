// @flow strict
import { createRef } from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal.js';

const mockOnDismiss = jest.fn();

describe('Modal', () => {
  if (typeof document !== 'undefined') {
    test('Modal renders with ref', () => {
      const modalRef = createRef();
      const modal = render(
        <Modal accessibilityModalLabel="Test modal" onDismiss={mockOnDismiss} ref={modalRef}>
          Modal content
        </Modal>,
      );

      expect(modal).toMatchSnapshot();
      expect(modalRef.current instanceof HTMLDivElement).toEqual(true);
    });
  }
});
