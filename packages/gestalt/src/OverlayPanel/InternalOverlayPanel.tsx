import { type ReactNode, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import ConfirmationPopover from './ConfirmationPopover';
import animation from '../animation/animation.css';
import { ANIMATION_STATE, useAnimation } from '../animation/AnimationContext';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext';
import Backdrop from '../Backdrop';
import StopScrollBehavior from '../behaviors/StopScrollBehavior';
import TrapFocusBehavior from '../behaviors/TrapFocusBehavior';
import Box from '../Box';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import { ScrollBoundaryContainerProvider } from '../contexts/ScrollBoundaryContainerProvider';
import Flex from '../Flex';
import focusStyles from '../Focus.css';
import Heading from '../Heading';
import { ESCAPE } from '../keyCodes';
import overlayPanelStyles from '../OverlayPanel.css';
import InternalScrollBoundaryContainer from '../ScrollBoundaryContainer/InternalScrollBoundaryContainerWithForwardRef';
import InternalDismissButton from '../sharedSubcomponents/InternalDismissButton';
import { FixedZIndex } from '../zIndex';

export const PADDING_BOINTS = 6;

type NodeOrRenderProp = ReactNode | ((arg1: { onDismissStart: () => void }) => ReactNode);

type InternalSheetProps = {
  accessibilityDismissButtonLabel?: string;
  accessibilityLabel: string;
  children: NodeOrRenderProp;
  closeOnOutsideClick: boolean;
  footer: NodeOrRenderProp;
  heading?: string;
  onAnimationEnd: (arg1: { animationState: 'in' | 'out' }) => void | null | undefined;
  onDismiss: () => void;
  dismissConfirmation?: {
    message?: string;
    subtext?: string;
    primaryAction?: {
      accessibilityLabel?: string;
      text?: string;
      onClick?: (arg1: {
        event:
          | React.MouseEvent<HTMLButtonElement>
          | React.MouseEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLButtonElement>;
      }) => void;
    };
    secondaryAction?: {
      accessibilityLabel?: string;
      text?: string;
      onClick?: (arg1: {
        event:
          | React.MouseEvent<HTMLButtonElement>
          | React.MouseEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLButtonElement>;
      }) => void;
    };
  };
  size: 'sm' | 'md' | 'lg';
  subHeading: NodeOrRenderProp;
};

const SIZE_WIDTH_MAP = {
  sm: 540,
  md: 720,
  lg: 900,
} as const;

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
}: InternalSheetProps) {
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
    component: ReactNode | ((arg1: { onDismissStart: () => void }) => ReactNode),
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
    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      // Handle onDismiss triggering from ESC keyup event
      if (event.keyCode === ESCAPE && enabledDismiss) {
        onExternalDismiss();
      }

      if (event.keyCode === ESCAPE && !enabledDismiss) {
        setShowPopover((value) => !value);
      }
    }

    // we must use keydown instead of keyup to match Popover events, as Popover gets dismissed in onKeyUp and we need to stopPropagation in the confirmation Popover
    // @ts-expect-error - TS2769 - No overload matches this call.
    window.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      // @ts-expect-error - TS2769 - No overload matches this call.
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
              aria-label={accessibilityLabel}
              className={classnames(overlayPanelStyles.wrapper, focusStyles.hideOutline, {
                [animation.slideInRtlInitialize]: animationState === ANIMATION_STATE.hidden,
                [animation.animationInSide]: animationState === ANIMATION_STATE.animatedOpening,
                [animation.animationOutSide]: animationState === ANIMATION_STATE.animatedClosing,
              })}
              id={id}
              onAnimationEnd={handleOnAnimationEnd}
              role="dialog"
              style={{ width: SIZE_WIDTH_MAP[size] }}
              tabIndex={-1}
            >
              <Box direction="column" display="flex" flex="grow" position="relative" width="100%">
                {Boolean(heading) && (
                  <Box
                    ref={dismissButtonRef}
                    borderStyle={showTopShadow ? 'raisedTopShadow' : undefined}
                    fit
                    position="relative"
                  >
                    <Flex alignItems="center" flex="grow" justifyContent="between">
                      <Box
                        display="flex"
                        flex="grow"
                        justifyContent="start"
                        padding={PADDING_BOINTS}
                      >
                        <Heading accessibilityLevel={1} size="500">
                          {heading}
                        </Heading>
                      </Box>
                      <Box flex="none" paddingX={6} paddingY={7}>
                        <InternalDismissButton
                          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
                          ref={dismissButtonRef}
                          accessibilityControls={id}
                          accessibilityLabel={
                            accessibilityDismissButtonLabel ??
                            accessibilityDismissButtonLabelDefault
                          }
                          onClick={enabledDismiss ? onExternalDismiss : () => setShowPopover(true)}
                          size="md"
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
                        // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
                        ref={dismissButtonRef}
                        accessibilityControls={id}
                        accessibilityLabel={
                          accessibilityDismissButtonLabel ?? accessibilityDismissButtonLabelDefault
                        }
                        onClick={enabledDismiss ? onExternalDismiss : () => setShowPopover(true)}
                        size="md"
                      />
                    </Box>
                  </Box>
                )}
                <ScrollBoundaryContainerProvider>
                  <InternalScrollBoundaryContainer includesFooter>
                    <ScrollBoundaryContainerProvider>
                      <InternalScrollBoundaryContainer
                        ref={contentRef}
                        onScroll={updateShadows}
                        padding={PADDING_BOINTS}
                      >
                        {buildDismissableSubcomponent(children)}
                      </InternalScrollBoundaryContainer>
                    </ScrollBoundaryContainerProvider>
                    {Boolean(footer) && (
                      <Box
                        borderStyle={showBottomShadow ? 'raisedBottomShadow' : undefined}
                        fit
                        position="relative"
                      >
                        <Box padding={PADDING_BOINTS}>{buildDismissableSubcomponent(footer)}</Box>
                      </Box>
                    )}
                  </InternalScrollBoundaryContainer>
                </ScrollBoundaryContainerProvider>

                {showPopover && (
                  <ConfirmationPopover
                    anchor={dismissButtonRef.current}
                    message={message}
                    onDismiss={() => {
                      setShowPopover(false);
                      dismissButtonRef?.current?.focus();
                    }}
                    primaryAction={primaryAction}
                    secondaryAction={secondaryAction}
                    subtext={subtext}
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
