// @flow strict
import { render } from '@testing-library/react';
import Modal from './Modal.js';

const mockOnDismiss = jest.fn();

describe('Modal', () => {
  if (typeof document !== 'undefined') {
    test('Modal renders', () => {
// eslint-disable-next-line testing-library/render-result-naming-convention -- Please fix the next time this file is touched!
      const modal = render(
        <Modal accessibilityModalLabel="Test modal" onDismiss={mockOnDismiss}>
          Modal content
        </Modal>,
      );

      expect(modal).toMatchSnapshot();
    });
  }
});
