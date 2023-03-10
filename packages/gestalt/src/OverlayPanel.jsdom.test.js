// @flow strict
import { act, fireEvent, screen, render } from '@testing-library/react';
import OverlayPanel from './OverlayPanel.js';
import * as AnimationControllerModule from './OverlayPanel/AnimationContext.js'; // eslint-disable-line import/no-namespace
import { ESCAPE } from './keyCodes.js';

describe('OverlayPanel', () => {
  let useAnimationMock;

  beforeEach(() => {
    useAnimationMock = jest.spyOn(AnimationControllerModule, 'useAnimation');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render all props with nodes', () => {
    const { container } = render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="OverlayPanel"
        closeOnOutsideClick
        footer={<footer />}
        heading="OverlayPanel title"
        onDismiss={jest.fn()}
        size="sm"
        subHeading={<nav />}
      >
        <section />
      </OverlayPanel>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render all props with render props', () => {
    const { container } = render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="OverlayPanel"
        closeOnOutsideClick
        footer={({ onDismissStart }) => <button onClick={onDismissStart} type="submit" />}
        heading="OverlayPanel title"
        onDismiss={jest.fn()}
        size="sm"
        subHeading={({ onDismissStart }) => <button onClick={onDismissStart} type="submit" />}
      >
        {({ onDismissStart }) => <button onClick={onDismissStart} type="submit" />}
      </OverlayPanel>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render animation in', () => {
    useAnimationMock.mockReturnValue({
      animationState: 'opening',
    });

    const { container } = render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="OverlayPanel"
        onDismiss={jest.fn()}
      >
        <section />
      </OverlayPanel>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render animation out', () => {
    useAnimationMock.mockReturnValue({
      animationState: 'closing',
    });

    const { container } = render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="OverlayPanel"
        onDismiss={jest.fn()}
      >
        <section />
      </OverlayPanel>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should focus the dismiss button upon render', () => {
    render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        onDismiss={jest.fn()}
      >
        <section />
      </OverlayPanel>,
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
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        onDismiss={jest.fn()}
      >
        <section />
      </OverlayPanel>,
    );

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnAnimationEnd).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from the dismiss button', () => {
    const mockOnDismiss = jest.fn();

    render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
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
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
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
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    const backDrop = screen.getByRole('dialog').parentElement?.firstElementChild;

    if (backDrop instanceof HTMLElement) fireEvent.click(backDrop);

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from clicking on the children content', () => {
    const mockOnDismiss = jest.fn();

    const { getByText } = render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        {({ onDismissStart }) => (
          <button onClick={onDismissStart} type="submit">
            Submit
          </button>
        )}
      </OverlayPanel>,
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
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        footer={({ onDismissStart }) => (
          <button onClick={onDismissStart} type="submit">
            Submit
          </button>
        )}
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
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
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        heading="Test OverlayPanel"
        onDismiss={mockOnDismiss}
        subHeading={({ onDismissStart }) => (
          <button onClick={onDismissStart} type="submit">
            Submit
          </button>
        )}
      >
        <section />
      </OverlayPanel>,
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
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick={false}
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    const backDrop = screen.getByRole('dialog').parentElement?.firstElementChild;
    if (backDrop instanceof HTMLElement) fireEvent.click(backDrop);

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(0);
  });

  it('should not dismiss from the backdrop click when closeOnOutsideClick and dismissConfirmation are true', () => {
    const mockOnDismiss = jest.fn();

    render(
      <OverlayPanel
        dismissConfirmation={{}}
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    const backDrop = screen.getByRole('dialog').parentElement?.firstElementChild;
    if (backDrop instanceof HTMLElement) fireEvent.click(backDrop);

    fireEvent.animationEnd(screen.getAllByRole('dialog')[0]);

    expect(mockOnDismiss).toHaveBeenCalledTimes(0);
  });

  it('should not dismiss from the dismiss button key when closeOnOutsideClick and dismissConfirmation are true', () => {
    const mockOnDismiss = jest.fn();

    render(
      <OverlayPanel
        dismissConfirmation={{}}
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
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
      <OverlayPanel
        dismissConfirmation={{}}
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
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

  it('renders OverlayPanel with confirmation modal', () => {
    const mockOnDismiss = jest.fn();

    const { container } = render(
      <OverlayPanel
        dismissConfirmation={{}}
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    const backDrop = screen.getByRole('dialog').parentElement?.firstElementChild;
    if (backDrop instanceof HTMLElement) fireEvent.click(backDrop);

    fireEvent.animationEnd(screen.getAllByRole('dialog')[0]);

    expect(container).toMatchSnapshot();
  });

  it('should show confirmation when closeOnOutsideClick and dismissConfirmation are true', () => {
    const mockOnDismiss = jest.fn();

    render(
      <OverlayPanel
        dismissConfirmation={{}}
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    const backDrop = screen.getByRole('dialog').parentElement?.firstElementChild;
    if (backDrop instanceof HTMLElement) fireEvent.click(backDrop);

    expect(
      screen.getByText('No, go back', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByLabelText('No, go back to the overlay panel.', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('Yes, dismiss', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByLabelText('Yes, dismiss the overlay panel.', {
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
      <OverlayPanel
        dismissConfirmation={{
          message,
          subtext,
          primaryAction: { text: primaryAction, accessibilityLabel: primaryActionLabel },
          secondaryAction: { text: secondaryAction, accessibilityLabel: secondaryActionLabel },
        }}
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    const backDrop = screen.getByRole('dialog').parentElement?.firstElementChild;
    if (backDrop instanceof HTMLElement) fireEvent.click(backDrop);

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
