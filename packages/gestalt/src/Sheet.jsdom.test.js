// @flow strict
import { act, fireEvent, screen, render } from '@testing-library/react';
import Sheet from './Sheet.js';
import * as AnimationControllerModule from './shared/AnimationController.js'; // eslint-disable-line import/no-namespace

describe('Sheet', () => {
  let useAnimationMock;

  beforeEach(() => {
    useAnimationMock = jest.spyOn(AnimationControllerModule, 'useAnimation');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render all props with nodes', () => {
    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Sheet"
        closeOnOutsideClick
        footer={<footer />}
        heading="Sheet title"
        onDismiss={jest.fn()}
        size="sm"
        subHeading={<nav />}
      >
        <section />
      </Sheet>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render all props with render props', () => {
    const { container } = render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Sheet"
        closeOnOutsideClick
        footer={({ onDismissStart }) => <button onClick={onDismissStart} type="submit" />}
        heading="Sheet title"
        onDismiss={jest.fn()}
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
    render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={jest.fn()}
      >
        <section />
      </Sheet>,
    );

    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(screen.getByRole('dialog')).toBe(document.activeElement);
  });

  it('should trigger onAnimationEnd', () => {
    const mockOnAnimationEnd = jest.fn();
    useAnimationMock.mockReturnValue({
      animationState: 'postIn',
      onAnimationEnd: mockOnAnimationEnd,
    });

    render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={jest.fn()}
      >
        <section />
      </Sheet>,
    );

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnAnimationEnd).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from the dismiss button', () => {
    const mockOnDismiss = jest.fn();

    render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        onDismiss={mockOnDismiss}
      >
        <section />
      </Sheet>,
    );
    act(() => {
      screen.getByLabelText('Dismiss').click();
    });
    fireEvent.animationEnd(screen.getByRole('dialog'));

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
        <section />
      </Sheet>,
    );
    fireEvent.keyUp(window.document, {
      keyCode: 27,
    });

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from clicking outside when closeOnOutsideClick is true', () => {
    const mockOnDismiss = jest.fn();

    render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        <section />
      </Sheet>,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    const backDrop = screen.getByRole('dialog').parentElement?.firstElementChild;
    if (!(backDrop instanceof HTMLElement)) {
      throw new Error('Backdrop should be an HTMLElement');
    }
    fireEvent.click(backDrop);

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from clicking on the children content', () => {
    const mockOnDismiss = jest.fn();

    const { getByText } = render(
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
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    const button = getByText('Submit');
    fireEvent.click(button);

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from clicking on the footer content', () => {
    const mockOnDismiss = jest.fn();

    const { getByText } = render(
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
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    const button = getByText('Submit');
    fireEvent.click(button);

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from clicking on the subHeading content', () => {
    const mockOnDismiss = jest.fn();

    const { getByText } = render(
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
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    const button = getByText('Submit');
    fireEvent.click(button);

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should not dismiss from the ESC key when closeOnOutsideClick is false', () => {
    const mockOnDismiss = jest.fn();

    render(
      <Sheet
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        closeOnOutsideClick={false}
        onDismiss={mockOnDismiss}
      >
        <section />
      </Sheet>,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    const backDrop = screen.getByRole('dialog').parentElement?.firstElementChild;
    if (!(backDrop instanceof HTMLElement)) {
      throw new Error('Backdrop should be an HTMLElement');
    }
    fireEvent.click(backDrop);

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(0);
  });
});
