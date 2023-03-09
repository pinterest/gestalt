// @flow strict

import { type Node, useCallback, useState, useEffect, useRef, useId } from 'react';
import classnames from 'classnames';
import { ESCAPE } from '../keyCodes.js';
import { useAnimation } from './AnimationContext.js';
import Box from '../Box.js';
import Backdrop from '../Backdrop.js';
import Flex from '../Flex.js';
import focusStyles from '../Focus.css';
import Heading from '../Heading.js';
import StopScrollBehavior from '../behaviors/StopScrollBehavior.js';
import InternalDismissButton from '../InternalDismissButton.js';
import ConfirmationPopover from './ConfirmationPopover.js';
import overlayPanelStyles from '../OverlayPanel.css';
import TrapFocusBehavior from '../behaviors/TrapFocusBehavior.js';
import InternalScrollBoundaryContainer from '../ScrollBoundaryContainerWithForwardRef.js';
import { ScrollBoundaryContainerProvider } from '../contexts/ScrollBoundaryContainerProvider.js';
import { FixedZIndex } from '../zIndex.js';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider.js';

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

export default function InternalSheet({
  accessibilityDismissButtonLabel,
  accessibilityLabel,
  children,
  closeOnOutsideClick,
  dismissConfirmation,
  footer,
  heading,
  onAnimationEnd,
  size,
  subHeading,
}: InternalSheetProps): Node {
  const [showTopShadow, setShowTopShadow] = useState<boolean>(false);

  const [showBottomShadow, setShowBottomShadow] = useState<boolean>(false);

  const [showPopover, setShowPopover] = useState<boolean>(false);

  const { animationState, handleAnimation, onAnimatedDismiss } = useAnimation();

  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
    useDefaultLabelContext('OverlayPanel');

  const contentRef = useRef<?HTMLElement>(null);

  const id = useId();

  const dismissButtonRef = useRef();

  const enabledDismiss = typeof dismissConfirmation === 'undefined';

  const { message, subtext, primaryAction, secondaryAction } = dismissConfirmation ?? {};

  useEffect(() => {
    if (dismissButtonRef.current) {
      dismissButtonRef.current.focus();
    }
  }, [dismissButtonRef]);

  // Handle onDismiss triggering from ESC keyup event
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === ESCAPE && enabledDismiss) {
        onAnimatedDismiss();
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
  }, [onAnimatedDismiss, enabledDismiss]);

  const handleOnAnimationEnd = useCallback(() => {
    const animationStatus = animationState === 'opening' ? 'in' : 'out';
    handleAnimation?.();
    onAnimationEnd?.({ animationState: animationStatus });
  }, [animationState, onAnimationEnd, handleAnimation]);

  // Handle onDismiss triggering from outside click
  const handleOutsideClick = useCallback(() => {
    if (closeOnOutsideClick && enabledDismiss) {
      onAnimatedDismiss();
    }

    if (closeOnOutsideClick && !enabledDismiss) {
      setShowPopover(true);
    }
  }, [closeOnOutsideClick, onAnimatedDismiss, enabledDismiss]);

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

  function buildDismissableSubcomponent(component) {
    return typeof component === 'function'
      ? component({ onDismissStart: onAnimatedDismiss })
      : component;
  }

  return (
    <StopScrollBehavior>
      <TrapFocusBehavior>
        <div className={overlayPanelStyles.container}>
          <Backdrop
            animationState={animationState}
            closeOnOutsideClick={closeOnOutsideClick}
            onClick={handleOutsideClick}
          >
            <div
              id={id}
              aria-label={accessibilityLabel}
              className={classnames(overlayPanelStyles.wrapper, focusStyles.hideOutline, {
                [overlayPanelStyles.wrapperAnimationIn]: animationState === 'opening',
                [overlayPanelStyles.wrapperAnimationOut]: animationState === 'closing',
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
                          onClick={enabledDismiss ? onAnimatedDismiss : () => setShowPopover(true)}
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
                        onClick={enabledDismiss ? onAnimatedDismiss : () => setShowPopover(true)}
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
