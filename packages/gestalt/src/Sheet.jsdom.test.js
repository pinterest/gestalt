// @flow strict
import { act, fireEvent, screen, render } from '@testing-library/react';
import Sheet from './Sheet.js';
import * as AnimationControllerModule from './AnimationContext.js'; // eslint-disable-line import/no-namespace
import { ESCAPE } from './keyCodes.js';

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
      animationState: 'opening',
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
      animationState: 'closing',
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

    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('should trigger onAnimationEnd', () => {
    const mockOnAnimationEnd = jest.fn();
    useAnimationMock.mockReturnValue({
      animationState: 'motionMount',
      handleAnimation: mockOnAnimationEnd,
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
    fireEvent.keyDown(window.document, {
      keyCode: ESCAPE,
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

  it('should not dismiss from the backdrop click when closeOnOutsideClick is false', () => {
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

  it('should not dismiss from the backdrop click when closeOnOutsideClick and dismissConfirmation are true', () => {
    const mockOnDismiss = jest.fn();

    render(
      <Sheet
        dismissConfirmation
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

    fireEvent.animationEnd(screen.getAllByRole('dialog')[0]);

    expect(mockOnDismiss).toHaveBeenCalledTimes(0);
  });

  it('should not dismiss from the dismiss button key when closeOnOutsideClick and dismissConfirmation are true', () => {
    const mockOnDismiss = jest.fn();

    render(
      <Sheet
        dismissConfirmation
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        <section />
      </Sheet>,
    );
    fireEvent.click(screen.getByRole('button'));

    expect(
      screen.getByText('Yes, dismiss', {
        exact: true,
      }),
    ).toBeVisible();
  });

  it('should not dismiss from the ESC keys when closeOnOutsideClick and dismissConfirmation are true', () => {
    const mockOnDismiss = jest.fn();

    render(
      <Sheet
        dismissConfirmation
        accessibilityDismissButtonLabel="Dismiss"
        accessibilitySheetLabel="Test Sheet"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        <section />
      </Sheet>,
    );

    fireEvent.keyDown(window.document, {
      keyCode: ESCAPE,
    });

    expect(
      screen.getByText('Yes, dismiss', {
        exact: true,
      }),
    ).toBeVisible();
  });

  it('renders Sheet with confirmation modal', () => {
    const mockOnDismiss = jest.fn();

    const { container } = render(
      <Sheet
        dismissConfirmation
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

    fireEvent.animationEnd(screen.getAllByRole('dialog')[0]);

    expect(container).toMatchSnapshot();
  });

  it('should show confirmation when closeOnOutsideClick and dismissConfirmation are true', () => {
    const mockOnDismiss = jest.fn();

    render(
      <Sheet
        dismissConfirmation
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

    expect(
      screen.getByText('No, go back', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByLabelText('No, go back to the sheet.', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('Yes, dismiss', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByLabelText('Yes, dismiss the sheet.', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('Are you sure you want to dismiss?', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('You will lose all of your changes. This cannot be undone.', {
        exact: true,
      }),
    ).toBeVisible();
  });

  it('should show custom confirmation when closeOnOutsideClick and dismissConfirmation are true', () => {
    const mockOnDismiss = jest.fn();

    const message = 'message';
    const subtext = 'subtext';
    const primaryAction = 'primaryAction';
    const primaryActionLabel = 'primaryActionLabel';
    const secondaryAction = 'secondaryAction';
    const secondaryActionLabel = 'secondaryActionLabel';

    render(
      <Sheet
        dismissConfirmation={{
          message,
          subtext,
          primaryAction: { text: primaryAction, accessibilityLabel: primaryActionLabel },
          secondaryAction: { text: secondaryAction, accessibilityLabel: secondaryActionLabel },
        }}
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

    expect(
      screen.getByText(secondaryAction, {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByLabelText(secondaryActionLabel, {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText(primaryAction, {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByLabelText(primaryActionLabel, {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText(message, {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText(subtext, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
