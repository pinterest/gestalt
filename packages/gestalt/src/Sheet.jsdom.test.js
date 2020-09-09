// @flow strict
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Sheet from './Sheet.js';
import * as useReducedMotionHook from './useReducedMotion.js'; // eslint-disable-line import/no-namespace

const useReducedMotionMock = jest.spyOn(useReducedMotionHook, 'default');

describe('Sheet', () => {
  it('should render all props', () => {
    useReducedMotionMock.mockReturnValue(false);

    const sheetRef = React.createRef();
    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Sheet"
        closeOnOutsideClick
        footer={<footer />}
        heading="Sheet title"
        onDismiss={jest.fn()}
        ref={sheetRef}
        size="sm"
      >
        Sheet content
      </Sheet>
    );

    expect(container).toMatchSnapshot();
  });

  it('should attach a ref', () => {
    const sheetRef = React.createRef();
    render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={jest.fn()}
        ref={sheetRef}
      >
        Sheet content
      </Sheet>
    );
    expect(sheetRef.current instanceof HTMLDivElement).toEqual(true);
  });

  it('should focus the dismiss button upon render', () => {
    const { getByLabelText } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={jest.fn()}
      >
        Sheet content
      </Sheet>
    );
    expect(getByLabelText('Dismiss')).toBe(document.activeElement);
  });

  it('should dismiss and focus on the reference element from the dismiss button', () => {
    useReducedMotionMock.mockReturnValue(true);
    const mockOnDismiss = jest.fn();

    const { getByLabelText } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={mockOnDismiss}
      >
        Sheet content
      </Sheet>
    );
    getByLabelText('Dismiss').click();
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss and focus on the reference element from the ESC key when closeOnOutsideClick is true', () => {
    useReducedMotionMock.mockReturnValue(true);
    const mockOnDismiss = jest.fn();

    render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        Sheet content
      </Sheet>
    );
    fireEvent.keyUp(window, {
      keyCode: 27,
    });
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should trigger out animation and dismiss when useReducedMotion is false', () => {
    useReducedMotionMock.mockReturnValue(false);
    const mockOnDismiss = jest.fn();

    const { container, getByLabelText } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={mockOnDismiss}
      >
        Sheet content
      </Sheet>
    );
    getByLabelText('Dismiss').click();
    expect(container).toMatchSnapshot();

    container
      .querySelector('div[role="dialog"]')
      .parentElement.dispatchEvent(new Event('animationend'));
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });
});
