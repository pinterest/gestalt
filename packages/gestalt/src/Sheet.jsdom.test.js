// @flow strict
import { createRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import Sheet from './Sheet.js';
import * as AnimationControllerModule from './AnimationController.js'; // eslint-disable-line import/no-namespace

describe('Sheet', () => {
  let useAnimationMock;

  beforeEach(() => {
    useAnimationMock = jest.spyOn(AnimationControllerModule, 'useAnimation');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render all props with nodes', () => {
    const sheetRef = createRef();
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
        subHeading={<nav />}
      >
        <section />
      </Sheet>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render all props with render props', () => {
    const sheetRef = createRef();
    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Sheet"
        closeOnOutsideClick
        footer={({ onDismissStart }) => <button onClick={onDismissStart} type="submit" />}
        heading="Sheet title"
        onDismiss={jest.fn()}
        ref={sheetRef}
        size="sm"
        subHeading={({ onDismissStart }) => <button onClick={onDismissStart} type="submit" />}
      >
        {({ onDismissStart }) => <button onClick={onDismissStart} type="submit" />}
      </Sheet>,
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
        <section />
      </Sheet>,
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
        <section />
      </Sheet>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should focus the dismiss button upon render', () => {
    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={jest.fn()}
      >
        <section />
      </Sheet>,
    );

    expect(container.querySelector('div[role="dialog"]')).toBe(document.activeElement);
  });

  it('should trigger onAnimationEnd', () => {
    const mockOnAnimationEnd = jest.fn();
    useAnimationMock.mockReturnValue({
      animationState: 'postIn',
      onAnimationEnd: mockOnAnimationEnd,
    });

    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={jest.fn()}
      >
        <section />
      </Sheet>,
    );
    fireEvent.animationEnd(container.querySelector('div[role="dialog"]'));

    expect(mockOnAnimationEnd).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from the dismiss button', () => {
    const mockOnDismiss = jest.fn();

    const { container, getByLabelText } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={mockOnDismiss}
      >
        <section />
      </Sheet>,
    );
    getByLabelText('Dismiss').click();
    fireEvent.animationEnd(container.querySelector('div[role="dialog"]'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from the ESC key', () => {
    const mockOnDismiss = jest.fn();

    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={mockOnDismiss}
      >
        <section />
      </Sheet>,
    );
    fireEvent.keyUp(window.document, {
      keyCode: 27,
    });
    fireEvent.animationEnd(container.querySelector('div[role="dialog"]'));

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
        <section />
      </Sheet>,
    );
    const backDrop = container.querySelector('div[role="dialog"]').parentElement.firstElementChild;
    fireEvent.click(backDrop);
    fireEvent.animationEnd(container.querySelector('div[role="dialog"]'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from clicking on the children content', () => {
    const mockOnDismiss = jest.fn();

    const { container, getByText } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        {({ onDismissStart }) => (
          <button onClick={onDismissStart} type="submit">
            Submit
          </button>
        )}
      </Sheet>,
    );
    const button = getByText('Submit');
    fireEvent.click(button);
    fireEvent.animationEnd(container.querySelector('div[role="dialog"]'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from clicking on the footer content', () => {
    const mockOnDismiss = jest.fn();

    const { container, getByText } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        closeOnOutsideClick
        footer={({ onDismissStart }) => (
          <button onClick={onDismissStart} type="submit">
            Submit
          </button>
        )}
        onDismiss={mockOnDismiss}
      >
        <section />
      </Sheet>,
    );
    const button = getByText('Submit');
    fireEvent.click(button);
    fireEvent.animationEnd(container.querySelector('div[role="dialog"]'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from clicking on the subHeading content', () => {
    const mockOnDismiss = jest.fn();

    const { container, getByText } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        closeOnOutsideClick
        heading="Test Sheet"
        onDismiss={mockOnDismiss}
        subHeading={({ onDismissStart }) => (
          <button onClick={onDismissStart} type="submit">
            Submit
          </button>
        )}
      >
        <section />
      </Sheet>,
    );
    const button = getByText('Submit');
    fireEvent.click(button);
    fireEvent.animationEnd(container.querySelector('div[role="dialog"]'));

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
        <section />
      </Sheet>,
    );
    const backDrop = container.querySelector('div[role="dialog"]').parentElement.firstElementChild;
    fireEvent.click(backDrop);
    fireEvent.animationEnd(container.querySelector('div[role="dialog"]'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(0);
  });
});
