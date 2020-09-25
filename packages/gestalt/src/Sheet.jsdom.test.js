// @flow strict
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Sheet from './Sheet.js';
import AnimationControllerModule from './AnimationController.js';

jest.mock('./AnimationController.js');

describe('Sheet', () => {
  const useAnimationMock = jest.spyOn(
    AnimationControllerModule,
    'useAnimation'
  );

  beforeEach(() => {
    useAnimationMock.mockReturnValue({
      animationState: null,
    });
  });

  it('should render all props', () => {
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

  it('should render animation in', () => {
    useAnimationMock.mockReturnValue({
      animationState: 'in',
    });

    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Sheet"
        onDismiss={jest.fn()}
      >
        Sheet content
      </Sheet>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render animation out', () => {
    useAnimationMock.mockReturnValue({
      animationState: 'out',
    });

    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Sheet"
        onDismiss={jest.fn()}
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
    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={jest.fn()}
      >
        Sheet content
      </Sheet>
    );

    expect(container.querySelector('div[role="dialog"]')).toBe(
      document.activeElement
    );
  });

  it('should dismiss from the dismiss button', () => {
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

  it('should dismiss from the ESC key', () => {
    const mockOnDismiss = jest.fn();

    render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={mockOnDismiss}
      >
        Sheet content
      </Sheet>
    );
    fireEvent.keyUp(window.document, {
      keyCode: 27,
    });

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from clicking outside when closeOnOutsideClick is true', () => {
    const mockOnDismiss = jest.fn();

    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        Sheet content
      </Sheet>
    );
    const backDrop = container.querySelector('div[role="dialog"]').parentElement
      .firstElementChild;
    fireEvent.click(backDrop);

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should not dismiss from the ESC key when closeOnOutsideClick is false', () => {
    const mockOnDismiss = jest.fn();

    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        closeOnOutsideClick={false}
        onDismiss={mockOnDismiss}
      >
        Sheet content
      </Sheet>
    );
    const backDrop = container.querySelector('div[role="dialog"]').parentElement
      .firstElementChild;
    fireEvent.click(backDrop);

    expect(mockOnDismiss).toHaveBeenCalledTimes(0);
  });

  it('should trigger onAnimationEnd', () => {
    const mockOnAnimationEnd = jest.fn();
    useAnimationMock.mockReturnValue({
      animationState: 'post-in',
      onAnimationEnd: mockOnAnimationEnd,
    });

    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={jest.fn()}
      >
        Sheet content
      </Sheet>
    );
    fireEvent.animationEnd(container.querySelector('div[role="dialog"]'));

    expect(mockOnAnimationEnd).toHaveBeenCalledTimes(1);
  });
});
