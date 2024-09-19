import { ComponentProps, ReactNode, useCallback, useEffect, useId, useLayoutEffect } from 'react';
import classnames from 'classnames';
import ContentContainer from './ContentContainer';
import Header from './Header';
import animation from '../animation/animation.css';
import { ANIMATION_STATE, useAnimation } from '../animation/AnimationContext';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext';
import Backdrop from '../Backdrop';
import StopScrollBehavior from '../behaviors/StopScrollBehavior';
import TrapFocusBehavior from '../behaviors/TrapFocusBehavior';
import Button from '../Button';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import { useGlobalEventsHandlerContext } from '../contexts/GlobalEventsHandlerProvider';
import focusStyles from '../Focus.css';
import { ESCAPE } from '../keyCodes';
import Link from '../Link';
import sheetMobileStyles from '../SheetMobile.css';
import { Indexable } from '../zIndex';

type OnClickType = (arg1: {
  event:
    | React.MouseEvent<HTMLButtonElement>
    | React.KeyboardEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>;
  onDismissStart: () => void;
}) => void;

type Props = {
  accessibilityLabel?: string;
  align: 'start' | 'center';
  backIconButton?: {
    accessibilityLabel: string;
    onClick: OnClickType;
  };
  children?: ReactNode;
  closeOnOutsideClick?: boolean;
  footer?: ReactNode;
  forwardIconButton?: {
    accessibilityLabel: string;
    onClick: OnClickType;
  };
  heading?: ReactNode;
  onAnimationEnd: (arg1: { animationState: 'in' | 'out' }) => void | null | undefined;
  onDismiss: () => void;
  onOutsideClick?: (arg1: { event: React.MouseEvent<HTMLDivElement> }) => void;
  padding?: 'default' | 'none';
  primaryAction?: {
    accessibilityLabel: string;
    href?: string;
    label: string;
    onClick: OnClickType;
    rel?: ComponentProps<typeof Link>['rel'];
    size?: ComponentProps<typeof Button>['size'];
    target?: ComponentProps<typeof Link>['target'];
  };
  role?: 'alertdialog' | 'dialog';
  showDismissButton?: boolean;
  size: 'default' | 'full' | 'auto';
  subHeading?: string;
  zIndex?: Indexable;
};

export default function PartialPage({
  accessibilityLabel,
  align,
  backIconButton,
  children,
  closeOnOutsideClick = true,
  onAnimationEnd,
  onDismiss,
  onOutsideClick,
  footer,
  forwardIconButton,
  padding,
  primaryAction,
  heading,
  role,
  showDismissButton,
  size,
  subHeading,
  zIndex,
}: Props) {
  const id = useId();

  // Consumes DefaultLabelProvider
  const { accessibilityLabel: defaultAccessibilityLabel } = useDefaultLabelContext('SheetMobile');

  // Consumes GlobalEventsHandlerProvider
  const { sheetMobileHandlers } = useGlobalEventsHandlerContext() ?? {
    sheetMobileHandlers: { onOpen: () => {}, onClose: () => {} },
  };

  const { onClose, onOpen } = sheetMobileHandlers ?? {
    onOpen: () => {},
    onClose: () => {},
  };

  useEffect(() => {
    onOpen?.();

    return function cleanup() {
      onClose?.();
    };
  }, [onClose, onOpen]);

  // Consumes AnimationProvider & RequestAnimationFrameProvider
  const { animationState, handleAnimationEnd } = useAnimation();
  const { handleRequestAnimationFrame, onExternalDismiss } = useRequestAnimationFrame();

  const handleOnAnimationEnd = useCallback(() => {
    handleAnimationEnd();
    handleRequestAnimationFrame();
    onAnimationEnd?.({
      animationState: animationState === ANIMATION_STATE.animatedOpening ? 'in' : 'out',
    });
  }, [animationState, onAnimationEnd, handleAnimationEnd, handleRequestAnimationFrame]);

  // Handle onDismiss triggering from ESC keyup event
  useEffect(() => {
    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.keyCode === ESCAPE) {
        onExternalDismiss();
      }
    }

    // @ts-expect-error - TS2769 - No overload matches this call.
    window.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      // @ts-expect-error - TS2769 - No overload matches this call.
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onExternalDismiss]);

  // When SheetMobile is full page displayed in mobile browser, the body scroll is still accessible. Here we disable to just allow the scrolling within Modal
  useEffect(() => {
    let prevOverflowStyle = 'auto';

    // @ts-expect-error - TS2339 - Property 'body' does not exist on type 'Window & typeof globalThis'.
    if (window && window.body?.style?.overflow) {
      // @ts-expect-error - TS2339 - Property 'body' does not exist on type 'Window & typeof globalThis'.
      prevOverflowStyle = window.body.style.overflow;
      // @ts-expect-error - TS2339 - Property 'body' does not exist on type 'Window & typeof globalThis'.
      window.body.style.overflow = 'hidden';
    }
    return () => {
      // @ts-expect-error - TS2339 - Property 'body' does not exist on type 'Window & typeof globalThis'.
      if (window && window.body?.style?.overflow) {
        // @ts-expect-error - TS2339 - Property 'body' does not exist on type 'Window & typeof globalThis'.
        window.body.style.overflow = prevOverflowStyle;
      }
    };
  }, []);

  useEffect(() => {
    // @ts-expect-error - TS2769 - No overload matches this call.
    // eslint-disable-next-line no-console
    console.log(navigator?.virtualKeyboard);
    // @ts-expect-error - TS2769 - No overload matches this call.
    navigator?.virtualKeyboard.addEventListener('geometrychange', (event) => {
      // eslint-disable-next-line no-console
      console.log(event.target.boundingRect);
      // Test if the keyboard is open, you will have to write this yourself
      // But just for an example:
      const keyboardOpen = event.target.boundingRect.height > 0;
      if (keyboardOpen) {
        // Make the parent element stop scrolling by making the overflow hidden
        // @ts-expect-error - TS2339 - Property 'body' does not exist on type 'Window & typeof globalThis'.
        if (window && window.body?.style?.overflow) {
          // @ts-expect-error - TS2339 - Property 'body' does not exist on type 'Window & typeof globalThis'.
          prevOverflowStyle = window.body.style.overflow;
          // @ts-expect-error - TS2339 - Property 'body' does not exist on type 'Window & typeof globalThis'.
          window.body.style.overflow = 'hidden';
        }
      }
    });

    return () => {
      // @ts-expect-error - TS2339 - Property 'body' does not exist on type 'Window & typeof globalThis'.
      if (window && window.body?.style?.overflow) {
        // @ts-expect-error - TS2339 - Property 'body' does not exist on type 'Window & typeof globalThis'.
        window.body.style.overflow = prevOverflowStyle;
      }
    };
  }, []);

  // Use useLayoutEffect instead of useEffect as we need to close the component synchronously after all DOM mutations, useEffect was needed to prevent changing state while still rendering but useEffect will create a ms blink of the full OverlayPanel after closing which gets prevented with useLayoutEffect
  useLayoutEffect(() => {
    if (animationState === ANIMATION_STATE.unmount) {
      onDismiss();
    }
  }, [animationState, onDismiss]);

  // Handle click outside the bottom sheet
  const handleBackdropClick: (event: React.MouseEvent<HTMLDivElement>) => void = useCallback(
    (event) => {
      onOutsideClick?.({ event });

      if (closeOnOutsideClick) {
        onExternalDismiss();
      }
    },
    [closeOnOutsideClick, onExternalDismiss, onOutsideClick],
  );

  return (
    <StopScrollBehavior>
      <TrapFocusBehavior>
        <div
          className={classnames(
            sheetMobileStyles.container,
            sheetMobileStyles.partialPageContainer,
          )}
          style={zIndex ? { zIndex: zIndex.index() } : undefined}
        >
          <Backdrop closeOnOutsideClick={closeOnOutsideClick} onClick={handleBackdropClick}>
            <div
              aria-label={accessibilityLabel ?? defaultAccessibilityLabel}
              className={classnames(sheetMobileStyles.wrapper, focusStyles.hideOutline, {
                [sheetMobileStyles.defaultWrapper]: size === 'default',
                [sheetMobileStyles.autoWrapper]: size === 'auto',
                [animation.slideUpInitialize]: animationState === ANIMATION_STATE.hidden,
                [animation.animationInBottom]: animationState === ANIMATION_STATE.animatedOpening,
                [animation.animationOutBottom]: animationState === ANIMATION_STATE.animatedClosing,
              })}
              id={id}
              onAnimationEnd={handleOnAnimationEnd}
              role={role}
              style={{ width: '100%' }}
              tabIndex={-1}
            >
              <ContentContainer
                footer={footer}
                header={
                  <Header
                    align={align}
                    backIconButton={backIconButton}
                    forwardIconButton={forwardIconButton}
                    heading={heading}
                    id={id}
                    primaryAction={primaryAction}
                    showDismissButton={showDismissButton}
                    showGrabber
                    subHeading={subHeading}
                  />
                }
                padding={padding}
              >
                {children}
              </ContentContainer>
            </div>
          </Backdrop>
        </div>
      </TrapFocusBehavior>
    </StopScrollBehavior>
  );
}
