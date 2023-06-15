// @flow strict
import {
  type ElementConfig,
  type Node,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
} from 'react';
import classnames from 'classnames';
import ContentContainer from './ContentContainer.js';
import Header from './Header.js';
import animation from '../animation/animation.css';
import { ANIMATION_STATE, useAnimation } from '../animation/AnimationContext.js';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext.js';
import Backdrop from '../Backdrop.js';
import StopScrollBehavior from '../behaviors/StopScrollBehavior.js';
import TrapFocusBehavior from '../behaviors/TrapFocusBehavior.js';
import Button from '../Button.js';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider.js';
import { useGlobalEventsHandlerContext } from '../contexts/GlobalEventsHandlerProvider.js';
import focusStyles from '../Focus.css';
import { ESCAPE } from '../keyCodes.js';
import Link from '../Link.js';
import sheetMobileStyles from '../SheetMobile.css';
import { type Indexable } from '../zIndex.js';

type OnClickType = ({|
  event:
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  onDismissStart: () => void,
|}) => void;

type Props = {|
  accessibilityLabel?: string,
  align: 'start' | 'center',
  backIconButton?: {| accessibilityLabel: string, onClick: OnClickType |},
  children?: Node,
  closeOnOutsideClick?: boolean,
  footer?: Node,
  forwardIconButton?: {|
    accessibilityLabel: string,
    onClick: OnClickType,
  |},
  heading?: Node,
  onAnimationEnd: ?({| animationState: 'in' | 'out' |}) => void,
  onDismiss: () => void,
  onOutsideClick?: ({|
    event: SyntheticMouseEvent<HTMLDivElement>,
  |}) => void,
  padding?: 'default' | 'none',
  primaryAction?: {|
    accessibilityLabel: string,
    href?: string,
    label: string,
    onClick: OnClickType,
    rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>,
    size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
    target?: $ElementType<ElementConfig<typeof Link>, 'target'>,
  |},
  role?: 'alertdialog' | 'dialog',
  showDismissButton?: boolean,
  size: 'default' | 'full' | 'auto',
  subHeading?: string,
  zIndex?: Indexable,
|};

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
}: Props): Node {
  const id = useId();

  // Consumes DefaultLabelProvider
  const { accessibilityLabel: defaultAccessibilityLabel } = useDefaultLabelContext('SheetMobile');

  // Consumes GlobalEventsHandlerProvider
  const { sheetMobileHandlers } = useGlobalEventsHandlerContext() ?? {
    sheetMobileHandlers: { onOpen: () => {}, onClose: () => {} },
  };

  const { onClose, onOpen } = sheetMobileHandlers ?? { onOpen: () => {}, onClose: () => {} };

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
    function handleKeyDown(event: SyntheticKeyboardEvent<HTMLDivElement>) {
      if (event.keyCode === ESCAPE) {
        onExternalDismiss();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onExternalDismiss]);

  // When SheetMobile is full page displayed in mobile browser, the body scroll is still accessible. Here we disable to just allow the scrolling within Modal
  useEffect(() => {
    let prevOverflowStyle = 'auto';

    if (window && window.body?.style?.overflow) {
      prevOverflowStyle = window.body.style.overflow;
      window.body.style.overflow = 'hidden';
    }
    return () => {
      if (window && window.body?.style?.overflow) {
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
  const handleBackdropClick: (event: SyntheticMouseEvent<HTMLDivElement>) => void = useCallback(
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
              id={id}
              aria-label={accessibilityLabel ?? defaultAccessibilityLabel}
              className={classnames(sheetMobileStyles.wrapper, focusStyles.hideOutline, {
                [sheetMobileStyles.defaultWrapper]: size === 'default',
                [sheetMobileStyles.autoWrapper]: size === 'auto',
                [animation.slideUpInitialize]: animationState === ANIMATION_STATE.hidden,
                [animation.animationInBottom]: animationState === ANIMATION_STATE.animatedOpening,
                [animation.animationOutBottom]: animationState === ANIMATION_STATE.animatedClosing,
              })}
              onAnimationEnd={handleOnAnimationEnd}
              tabIndex={-1}
              style={{ width: '100%' }}
              role={role}
            >
              <ContentContainer
                header={
                  <Header
                    align={align}
                    backIconButton={backIconButton}
                    forwardIconButton={forwardIconButton}
                    id={id}
                    primaryAction={primaryAction}
                    heading={heading}
                    showDismissButton={showDismissButton}
                    subHeading={subHeading}
                    showGrabber
                  />
                }
                footer={footer}
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
