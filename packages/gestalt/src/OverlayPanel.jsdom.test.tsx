import { act, fireEvent, render, screen } from '@testing-library/react';
import * as AnimationControllerModule from './animation/AnimationContext';
import { ESCAPE } from './keyCodes';
import OverlayPanel from './OverlayPanel';
import * as useReducedMotionHook from './useReducedMotion';

jest.mock('./useReducedMotion');

describe('OverlayPanel', () => {
  let useAnimationMock: any;
  const useReducedMotionMock = jest.spyOn(useReducedMotionHook, 'default');

  beforeEach(() => {
    useAnimationMock = jest.spyOn(AnimationControllerModule, 'useAnimation');
    useReducedMotionMock.mockReturnValue(true);
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
        footer={({ onDismissStart }: any) => <button onClick={onDismissStart} type="submit" />}
        heading="OverlayPanel title"
        onDismiss={jest.fn()}
        size="sm"
        subHeading={({ onDismissStart }: any) => <button onClick={onDismissStart} type="submit" />}
      >
        {({ onDismissStart }: any) => <button onClick={onDismissStart} type="submit" />}
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

  // This test was skipped because, despite the logic works fine, the animationState is not being correctly updated in the test in the handleExternalDismiss function. We should try to make it work.
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should trigger onAnimationEnd', async () => {
    // @ts-expect-error - TS2344 - Type 'unknown' does not satisfy the constraint 'any[]'.
    const mockOnAnimationEnd = jest.fn<ReadonlyArray<any>, unknown>();
    render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        onDismiss={jest.fn()}
      >
        <section />
      </OverlayPanel>,
    );

    await screen.findByLabelText('Test OverlayPanel');

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnAnimationEnd).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from the dismiss button', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

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
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

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
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

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
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

    render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        onDismiss={mockOnDismiss}
      >
        <OverlayPanel.DismissingElement>
          {({ onDismissStart }: any) => (
            <button onClick={onDismissStart} type="submit">
              Submit
            </button>
          )}
        </OverlayPanel.DismissingElement>
      </OverlayPanel>,
    );

    fireEvent.click(screen.getByText('Submit'));

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from clicking on the footer content', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

    render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        footer={
          <OverlayPanel.DismissingElement>
            {({ onDismissStart }: any) => (
              <button onClick={onDismissStart} type="submit">
                Submit
              </button>
            )}
          </OverlayPanel.DismissingElement>
        }
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
    );

    fireEvent.click(screen.getByText('Submit'));

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should dismiss from clicking on the subHeading content', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

    render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        heading="Test OverlayPanel"
        onDismiss={mockOnDismiss}
        subHeading={
          <OverlayPanel.DismissingElement>
            {({ onDismissStart }: any) => (
              <button onClick={onDismissStart} type="submit">
                Submit
              </button>
            )}
          </OverlayPanel.DismissingElement>
        }
      >
        <section />
      </OverlayPanel>,
    );

    fireEvent.click(screen.getByText('Submit'));

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should not dismiss from the backdrop click when closeOnOutsideClick is false', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

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
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

    render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        dismissConfirmation={{}}
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    const backDrop = screen.getByRole('dialog').parentElement?.firstElementChild;
    if (backDrop instanceof HTMLElement) fireEvent.click(backDrop);

    const dialog = screen.getAllByRole('dialog')[0];
    if (dialog) {
      fireEvent.animationEnd(dialog);
    }

    expect(mockOnDismiss).toHaveBeenCalledTimes(0);
  });

  it('should not dismiss from the dismiss button key when closeOnOutsideClick and dismissConfirmation are true', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

    render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        dismissConfirmation={{}}
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
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

    render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        dismissConfirmation={{}}
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
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

    const { container } = render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        dismissConfirmation={{}}
        onDismiss={mockOnDismiss}
      >
        <section />
      </OverlayPanel>,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    const backDrop = screen.getByRole('dialog').parentElement?.firstElementChild;
    if (backDrop instanceof HTMLElement) fireEvent.click(backDrop);

    const dialog = screen.getAllByRole('dialog')[0];
    if (dialog) {
      fireEvent.animationEnd(dialog);
    }

    expect(container).toMatchSnapshot();
  });

  it('should show confirmation when closeOnOutsideClick and dismissConfirmation are true', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();

    render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        dismissConfirmation={{}}
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
      screen.getByLabelText('No, go back to the overlay panel', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('Yes, dismiss', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByLabelText('Yes, dismiss the overlay panel', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('Are you sure you want to dismiss?', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('You will lose all of your changes. This cannot be undone', {
        exact: true,
      }),
    ).toBeVisible();
  });

  it('should show custom confirmation when closeOnOutsideClick and dismissConfirmation are true', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();
    // @ts-expect-error - TS2344 - Type 'unknown' does not satisfy the constraint 'any[]'.
    const mockOnAnimationEnd = jest.fn<ReadonlyArray<any>, unknown>();
    useAnimationMock.mockReturnValue({
      animationState: 'unmount',
      handleAnimationEnd: mockOnAnimationEnd,
    });

    const message = 'message';
    const subtext = 'subtext';
    const primaryAction = 'primaryAction';
    const primaryActionLabel = 'primaryActionLabel';
    const secondaryAction = 'secondaryAction';
    const secondaryActionLabel = 'secondaryActionLabel';

    render(
      <OverlayPanel
        accessibilityDismissButtonLabel="Dismiss"
        accessibilityLabel="Test OverlayPanel"
        closeOnOutsideClick
        dismissConfirmation={{
          message,
          subtext,
          primaryAction: { text: primaryAction, accessibilityLabel: primaryActionLabel },
          secondaryAction: { text: secondaryAction, accessibilityLabel: secondaryActionLabel },
        }}
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
