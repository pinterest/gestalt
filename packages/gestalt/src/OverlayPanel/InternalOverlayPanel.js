// @flow strict

import { type Node, useCallback, useState, useLayoutEffect, useEffect, useRef, useId } from 'react';
import classnames from 'classnames';
import animation from '../animation/animation.css';
import { useAnimation, ANIMATION_STATE } from '../animation/AnimationContext.js';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext.js';
import Backdrop from '../Backdrop.js';
import StopScrollBehavior from '../behaviors/StopScrollBehavior.js';
import TrapFocusBehavior from '../behaviors/TrapFocusBehavior.js';
import Box from '../Box.js';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider.js';
import { ScrollBoundaryContainerProvider } from '../contexts/ScrollBoundaryContainerProvider.js';
import Flex from '../Flex.js';
import focusStyles from '../Focus.css';
import Heading from '../Heading.js';
import { ESCAPE } from '../keyCodes.js';
import overlayPanelStyles from '../OverlayPanel.css';
import InternalScrollBoundaryContainer from '../ScrollBoundaryContainer/InternalScrollBoundaryContainerWithForwardRef.js';
import InternalDismissButton from '../shared/InternalDismissButton.js';
import { FixedZIndex } from '../zIndex.js';
import ConfirmationPopover from './ConfirmationPopover.js';

export const PADDING_BOINTS = 6;

type NodeOrRenderProp = Node | (({| onDismissStart: () => void |}) => Node);

type InternalSheetProps = {|
  accessibilityDismissButtonLabel?: string,
  accessibilityLabel: string,
  children: NodeOrRenderProp,
  closeOnOutsideClick: boolean,
  footer: NodeOrRenderProp,
  heading?: string,
  onAnimationEnd: ?({| animationState: 'in' | 'out' |}) => void,
  onDismiss: () => void,
  dismissConfirmation?: {|
    message?: string,
    subtext?: string,
    primaryAction?: {|
      accessibilityLabel?: string,
      text?: string,
      onClick?: ({|
        event:
          | SyntheticMouseEvent<HTMLButtonElement>
          | SyntheticMouseEvent<HTMLAnchorElement>
          | SyntheticKeyboardEvent<HTMLAnchorElement>
          | SyntheticKeyboardEvent<HTMLButtonElement>,
      |}) => void,
    |},
    secondaryAction?: {|
      accessibilityLabel?: string,
      text?: string,
      onClick?: ({|
        event:
          | SyntheticMouseEvent<HTMLButtonElement>
          | SyntheticMouseEvent<HTMLAnchorElement>
          | SyntheticKeyboardEvent<HTMLAnchorElement>
          | SyntheticKeyboardEvent<HTMLButtonElement>,
      |}) => void,
    |},
  |},
  size: 'sm' | 'md' | 'lg',
  subHeading: NodeOrRenderProp,
|};

const SIZE_WIDTH_MAP = {
  sm: 540,
  md: 720,
  lg: 900,
};

export default function InternalOverlayPanel({
  accessibilityDismissButtonLabel,
  accessibilityLabel,
  children,
  closeOnOutsideClick,
  dismissConfirmation,
  footer,
  heading,
  onAnimationEnd,
  onDismiss,
  size,
  subHeading,
}: InternalSheetProps): Node {
  const [showTopShadow, setShowTopShadow] = useState<boolean>(false);
  const [showBottomShadow, setShowBottomShadow] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);

  const contentRef = useRef<null | HTMLElement>(null);
  const dismissButtonRef = useRef<null | HTMLElement>(null);

  const id = useId();

  const { animationState, handleAnimationEnd } = useAnimation();
  const { handleRequestAnimationFrame, onExternalDismiss } = useRequestAnimationFrame();

  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
    useDefaultLabelContext('OverlayPanel');

  const enabledDismiss = typeof dismissConfirmation === 'undefined';

  const { message, subtext, primaryAction, secondaryAction } = dismissConfirmation ?? {};

  function buildDismissableSubcomponent(
    component: Node | (({| onDismissStart: () => void |}) => Node),
  ) {
    return typeof component === 'function'
      ? component({ onDismissStart: onExternalDismiss })
      : component;
  }

  const handleOnAnimationEnd = useCallback(() => {
    handleAnimationEnd?.();
    handleRequestAnimationFrame();
    onAnimationEnd?.({
      animationState: animationState === ANIMATION_STATE.animatedOpening ? 'in' : 'out',
    });
  }, [animationState, onAnimationEnd, handleAnimationEnd, handleRequestAnimationFrame]);

  const handleBackdropClick = useCallback(() => {
    if (closeOnOutsideClick && enabledDismiss) {
      onExternalDismiss();
    }

    if (closeOnOutsideClick && !enabledDismiss) {
      setShowPopover(true);
    }
  }, [closeOnOutsideClick, onExternalDismiss, enabledDismiss]);

  // Handle the shadows on top and bottom of the content area when scrolling
  const updateShadows = useCallback(() => {
    const target = contentRef.current;
    if (!target) return;

    const hasVerticalScrollbar = target.clientHeight < target.scrollHeight;
    setShowTopShadow(hasVerticalScrollbar && target.scrollTop > 0);
    setShowBottomShadow(
      hasVerticalScrollbar && target.offsetHeight + target.scrollTop < target.scrollHeight,
    );
  }, []);

  useEffect(() => {
    dismissButtonRef.current?.focus();
  }, [dismissButtonRef]);

  useEffect(() => {
    function handleKeyDown(event: SyntheticKeyboardEvent<HTMLDivElement>) {
      // Handle onDismiss triggering from ESC keyup event
      if (event.keyCode === ESCAPE && enabledDismiss) {
        onExternalDismiss();
      }

      if (event.keyCode === ESCAPE && !enabledDismiss) {
        setShowPopover((value) => !value);
      }
    }

    // we must use keydown instead of keyup to match Popover events, as Popover gets dismissed in onKeyUp and we need to stopPropagation in the confirmation Popover
    window.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onExternalDismiss, enabledDismiss]);

  useEffect(() => {
    updateShadows();
    window.addEventListener('resize', updateShadows);
    return () => {
      window.removeEventListener('resize', updateShadows);
    };
  }, [updateShadows]);

  if (!!subHeading && !heading) {
    throw new Error(
      `Gestalt OverlayPanel's \`subHeading\` prop requires to be along with \`heading\` prop. Remove this prop or add \`heading\``,
    );
  }

  // Use useLayoutEffect instead of useEffect as we need to close the component synchronously after all DOM mutations, useEffect was needed to prevent changing state while still rendering but useEffect will create a ms blink of the full OverlayPanel after closing which gets prevented with useLayoutEffect
  useLayoutEffect(() => {
    if (animationState === ANIMATION_STATE.unmount) {
      onDismiss();
    }
  }, [animationState, onDismiss]);

  return (
    <StopScrollBehavior>
      <TrapFocusBehavior>
        <div className={overlayPanelStyles.container}>
          <Backdrop closeOnOutsideClick={closeOnOutsideClick} onClick={handleBackdropClick}>
            <div
              id={id}
              aria-label={accessibilityLabel}
              className={classnames(overlayPanelStyles.wrapper, focusStyles.hideOutline, {
                [animation.slideInRtlInitialize]: animationState === ANIMATION_STATE.hidden,
                [animation.animationInSide]: animationState === ANIMATION_STATE.animatedOpening,
                [animation.animationOutSide]: animationState === ANIMATION_STATE.animatedClosing,
              })}
              onAnimationEnd={handleOnAnimationEnd}
              role="dialog"
              style={{ width: SIZE_WIDTH_MAP[size] }}
              tabIndex={-1}
            >
              <Box flex="grow" position="relative" display="flex" direction="column" width="100%">
                {Boolean(heading) && (
                  <Box
                    borderStyle={showTopShadow ? 'raisedTopShadow' : undefined}
                    position="relative"
                    fit
                    ref={dismissButtonRef}
                  >
                    <Flex alignItems="center" flex="grow" justifyContent="between">
                      <Box
                        display="flex"
                        justifyContent="start"
                        padding={PADDING_BOINTS}
                        flex="grow"
                      >
                        <Heading size="500" accessibilityLevel={1}>
                          {heading}
                        </Heading>
                      </Box>
                      <Box flex="none" paddingX={6} paddingY={7}>
                        <InternalDismissButton
                          accessibilityControls={id}
                          accessibilityLabel={
                            accessibilityDismissButtonLabel ??
                            accessibilityDismissButtonLabelDefault
                          }
                          onClick={enabledDismiss ? onExternalDismiss : () => setShowPopover(true)}
                          size="md"
                          ref={dismissButtonRef}
                        />
                      </Box>
                    </Flex>
                    {buildDismissableSubcomponent(subHeading)}
                  </Box>
                )}
                {!heading && (
                  <Box display="flex" flex="grow" justifyContent="end" marginBottom={8}>
                    <Box
                      flex="none"
                      paddingX={6}
                      paddingY={7}
                      position="absolute"
                      zIndex={new FixedZIndex(1)}
                    >
                      <InternalDismissButton
                        accessibilityControls={id}
                        accessibilityLabel={
                          accessibilityDismissButtonLabel ?? accessibilityDismissButtonLabelDefault
                        }
                        onClick={enabledDismiss ? onExternalDismiss : () => setShowPopover(true)}
                        size="md"
                        ref={dismissButtonRef}
                      />
                    </Box>
                  </Box>
                )}
                <ScrollBoundaryContainerProvider>
                  <InternalScrollBoundaryContainer
                    onScroll={updateShadows}
                    padding={PADDING_BOINTS}
                    ref={contentRef}
                  >
                    {buildDismissableSubcomponent(children)}
                  </InternalScrollBoundaryContainer>
                </ScrollBoundaryContainerProvider>
                {Boolean(footer) && (
                  <Box
                    borderStyle={showBottomShadow ? 'raisedBottomShadow' : undefined}
                    position="relative"
                    fit
                  >
                    <Box padding={PADDING_BOINTS}>{buildDismissableSubcomponent(footer)}</Box>
                  </Box>
                )}
                {showPopover && (
                  <ConfirmationPopover
                    anchor={dismissButtonRef.current}
                    message={message}
                    subtext={subtext}
                    primaryAction={primaryAction}
                    secondaryAction={secondaryAction}
                    onDismiss={() => {
                      setShowPopover(false);
                      dismissButtonRef?.current?.focus();
                    }}
                  />
                )}
              </Box>
            </div>
          </Backdrop>
        </div>
      </TrapFocusBehavior>
    </StopScrollBehavior>
  );
}
