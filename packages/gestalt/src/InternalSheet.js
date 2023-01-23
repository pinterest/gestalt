// @flow strict

import { type Node, useCallback, useState, useEffect, useRef, useId } from 'react';
import classnames from 'classnames';
import { ESCAPE } from './keyCodes.js';
import { useAnimation } from './AnimationController.js';
import Box from './Box.js';
import Backdrop from './Backdrop.js';
import Flex from './Flex.js';
import focusStyles from './Focus.css';
import IconButton from './IconButton.js';
import Heading from './Heading.js';
import StopScrollBehavior from './behaviors/StopScrollBehavior.js';
import InternalDismissButton from './InternalDismissButton.js';
import sheetStyles from './Sheet.css';
import TrapFocusBehavior from './behaviors/TrapFocusBehavior.js';
import InternalScrollBoundaryContainer from './ScrollBoundaryContainerWithForwardRef.js';
import { ScrollBoundaryContainerProvider } from './contexts/ScrollBoundaryContainerProvider.js';
import { FixedZIndex } from './zIndex.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';

export const PADDING_BOINTS = 6;

type Size = 'sm' | 'md' | 'lg';

type OnAnimationEndStateType = 'in' | 'out';

type NodeOrRenderProp = Node | (({| onDismissStart: () => void |}) => Node);

type InternalSheetProps = {|
  accessibilityDismissButtonLabel: string,
  accessibilitySheetLabel: string,
  children: Node,
  closeOnOutsideClick?: boolean,
  footer?: Node,
  heading?: string,
  onAnimationEnd?: ({| animationState: OnAnimationEndStateType |}) => void,
  onDismiss: () => void,
  size?: Size,
  subHeading?: Node,
|};

const SIZE_WIDTH_MAP = {
  sm: 540,
  md: 720,
  lg: 900,
};

export default function InternalSheet({
  accessibilityDismissButtonLabel,
  accessibilitySheetLabel,
  children,
  closeOnOutsideClick = true,
  footer,
  heading,
  onAnimationEnd,
  onDismiss,
  size = 'sm',
  subHeading,
}: InternalSheetProps): Node {
  const [showTopShadow, setShowTopShadow] = useState<boolean>(false);

  const [showBottomShadow, setShowBottomShadow] = useState<boolean>(false);

  const { animationState: animationStateFromHook, onAnimationEnd: onAnimationEndFromHook } =
    useAnimation();

  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
    useDefaultLabelContext('Sheet');

  const contentRef = useRef<?HTMLElement>(null);

  const id = useId();

  const dismissButtonRef = useRef();

  useEffect(() => {
    if (dismissButtonRef.current) {
      dismissButtonRef.current.focus();
    }
  }, [dismissButtonRef]);

  // Handle onDismiss triggering from ESC keyup event
  useEffect(() => {
    function handleKeyUp(event: {| keyCode: number |}) {
      if (event.keyCode === ESCAPE) {
        onDismiss();
      }
    }

    window.addEventListener('keyup', handleKeyUp);
    return function cleanup() {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onDismiss]);

  const handleOnAnimationEnd = useCallback(() => {
    onAnimationEndFromHook?.();
    onAnimationEnd?.({ animationState: animationStateFromHook === 'in' ? 'in' : 'out' });
  }, [animationStateFromHook, onAnimationEnd, onAnimationEndFromHook]);

  // Handle onDismiss triggering from outside click
  const handleOutsideClick = useCallback(() => {
    if (closeOnOutsideClick) {
      onDismiss();
    }
  }, [closeOnOutsideClick, onDismiss]);

  // Handle the shadows on top and bottom of the content area when scrolling
  const updateShadows = useCallback(() => {
    const target = contentRef.current;
    if (!target) {
      return;
    }
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
      `Gestalt Sheet's \`subHeading\` prop requires to be along with \`heading\` prop. Remove this prop or add \`heading\``,
    );
  }

  return (
    <StopScrollBehavior>
      <TrapFocusBehavior>
        <div className={sheetStyles.container}>
          <Backdrop
            animationState={animationStateFromHook}
            closeOnOutsideClick={closeOnOutsideClick}
            onClick={handleOutsideClick}
          >
            <div
              id={id}
              aria-label={accessibilitySheetLabel}
              className={classnames(sheetStyles.wrapper, focusStyles.hideOutline, {
                [sheetStyles.wrapperAnimationIn]: animationStateFromHook === 'in',
                [sheetStyles.wrapperAnimationOut]: animationStateFromHook === 'out',
              })}
              onAnimationEnd={handleOnAnimationEnd}
              role="dialog"
              style={{ width: SIZE_WIDTH_MAP[size] }}
              tabIndex={-1}
            >
              <Box flex="grow" position="relative" display="flex" direction="column" width="100%">
                {heading && (
                  <Box
                    borderStyle={showTopShadow ? 'raisedTopShadow' : undefined}
                    position="relative"
                    fit
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
                          onClick={onDismiss}
                          size="md"
                          ref={dismissButtonRef}
                        />
                      </Box>
                    </Flex>
                    {subHeading}
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
                        onClick={onDismiss}
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
                    {children}
                  </InternalScrollBoundaryContainer>
                </ScrollBoundaryContainerProvider>
                {Boolean(footer) && (
                  <Box
                    borderStyle={showBottomShadow ? 'raisedBottomShadow' : undefined}
                    position="relative"
                    fit
                  >
                    <Box padding={PADDING_BOINTS}>{footer}</Box>
                  </Box>
                )}
              </Box>
            </div>
          </Backdrop>
        </div>
      </TrapFocusBehavior>
    </StopScrollBehavior>
  );
}
