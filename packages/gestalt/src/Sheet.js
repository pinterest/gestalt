// @flow strict

/*

# Welcome to Sheet!

This guide will help you navigate and understand its design. This file is roughly organized like:

  1. Internal components <Header> and <DismissButton>
  2. Sheet function: the one with the actual component logic
  3. <SheetWithForwardRef> component: wrapper for forwarding ref to <Sheet>
  4. AnimatedSheet function: adds animation capabilities
  5. <AnimatedSheetWithForwardRef> component: wrapper for forwarding ref to <AnimatedSheet>, the one which gets exported

This is how all these components are used:

a. The default export is <AnimatedSheetWithForwardRef>
b. <AnimatedSheetWithForwardRef> wraps AnimatedSheet
c. AnimatedSheet includes <SheetWithForwardRef>
d. <SheetWithForwardRef> wraps Sheet
e. Sheet is the actual component logic which includes the internal components <Header> and <DismissButton>.

*/

import React, { forwardRef, useCallback, useState, useEffect, useRef, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ESCAPE } from './keyCodes.js';
import AnimationController, { useAnimation } from './AnimationController.js';
import Box from './Box.js';
import Backdrop from './Backdrop.js';
import Flex from './Flex.js';
import focusStyles from './Focus.css';
import IconButton from './IconButton.js';
import Heading from './Heading.js';
import StopScrollBehavior from './behaviors/StopScrollBehavior.js';
import sheetStyles from './Sheet.css';
import TrapFocusBehavior from './behaviors/TrapFocusBehavior.js';
import { ScrollableContainerWithForwardRef as InternalScrollableContainer } from './ScrollableContainer.js';
import { ScrollableContainerProvider } from './contexts/ScrollableContainer.js';

type SheetMainProps = {|
  _dangerousScrollableExperimentEnabled?: boolean, // Temporary undocumented prop to support experimentation inside Modal and Sheet.
  accessibilityDismissButtonLabel: string,
  accessibilitySheetLabel: string,
  children: Node,
  closeOnOutsideClick?: boolean,
  footer?: Node,
  onDismiss: () => void,
  size?: 'sm' | 'md' | 'lg',
|};

type SheetProps = {|
  ...SheetMainProps,
  heading?: string,
  subHeading?: Node,
|};

type NodeOrRenderProp = Node | (({| onDismissStart: () => void |}) => Node);

type AnimatedSheetMainProps = {|
  ...SheetMainProps,
  children: NodeOrRenderProp,
  footer?: NodeOrRenderProp,
|};

type AnimatedSheetWithHeadingProps = {|
  ...AnimatedSheetMainProps,
  heading: string,
  subHeading?: NodeOrRenderProp,
|};

type AnimatedSheetProps = AnimatedSheetMainProps | AnimatedSheetWithHeadingProps;

const SIZE_WIDTH_MAP = {
  sm: 540,
  md: 720,
  lg: 900,
};

/*

Internal components <Header> and <DismissButton>

*/
const Header = ({ heading }: {| heading: string |}) => (
  <Box display="flex" justifyContent="start" padding={8}>
    <Heading size="md" accessibilityLevel={1}>
      {heading}
    </Heading>
  </Box>
);

const DismissButton = ({
  accessibilityDismissButtonLabel,
  onClick,
}: {|
  accessibilityDismissButtonLabel: string,
  onClick: () => void,
|}) => (
  <IconButton
    accessibilityLabel={accessibilityDismissButtonLabel}
    bgColor="white"
    icon="cancel"
    iconColor="darkGray"
    onClick={onClick}
  />
);

/*

<Sheet> component: the one with the actual component logic
<SheetWithForwardRef> component: wrapper for forwarding ref to <Sheet>

 */
const SheetWithForwardRef: React$AbstractComponent<SheetProps, HTMLDivElement> = forwardRef<
  SheetProps,
  HTMLDivElement,
>(function Sheet(props, sheetRef): Node {
  const {
    _dangerousScrollableExperimentEnabled,
    accessibilityDismissButtonLabel,
    accessibilitySheetLabel,
    children,
    closeOnOutsideClick = true,
    footer,
    heading,
    onDismiss,
    size = 'sm',
    subHeading,
  } = props;

  const [showTopShadow, setShowTopShadow] = useState<boolean>(false);
  const [showBottomShadow, setShowBottomShadow] = useState<boolean>(false);
  const { animationState, onAnimationEnd } = useAnimation();
  const containerRef = useRef<?HTMLDivElement>(null);
  const contentRef = useRef<?HTMLDivElement>(null);

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

  return (
    <StopScrollBehavior>
      <TrapFocusBehavior>
        <div className={sheetStyles.container} ref={containerRef}>
          <Backdrop
            animationState={animationState}
            closeOnOutsideClick={closeOnOutsideClick}
            onClick={handleOutsideClick}
          >
            <div
              aria-label={accessibilitySheetLabel}
              className={classnames(sheetStyles.wrapper, focusStyles.hideOutline, {
                [sheetStyles.wrapperAnimationIn]: animationState === 'in',
                [sheetStyles.wrapperAnimationOut]: animationState === 'out',
              })}
              onAnimationEnd={onAnimationEnd}
              ref={sheetRef}
              role="dialog"
              style={{ width: SIZE_WIDTH_MAP[size] }}
              tabIndex={-1}
            >
              <Box flex="grow" position="relative" display="flex" direction="column" width="100%">
                {heading && (
                  <div
                    className={classnames(sheetStyles.shadowContainer, {
                      [sheetStyles.shadow]: showTopShadow,
                    })}
                  >
                    <Flex alignItems="center" flex="grow" justifyContent="between">
                      <Box flex="grow">
                        <Header heading={heading} />
                      </Box>
                      <Box flex="none" paddingX={6} paddingY={7}>
                        <DismissButton
                          accessibilityDismissButtonLabel={accessibilityDismissButtonLabel}
                          onClick={onDismiss}
                        />
                      </Box>
                    </Flex>
                    {subHeading}
                  </div>
                )}
                {!heading && (
                  <Box display="flex" flex="grow" justifyContent="end" marginBottom={8}>
                    <Box flex="none" paddingX={6} paddingY={7} position="absolute">
                      <DismissButton
                        accessibilityDismissButtonLabel={accessibilityDismissButtonLabel}
                        onClick={onDismiss}
                      />
                    </Box>
                  </Box>
                )}
                {_dangerousScrollableExperimentEnabled ? (
                  <ScrollableContainerProvider>
                    <InternalScrollableContainer
                      onScroll={updateShadows}
                      padding={8}
                      ref={contentRef}
                    >
                      {children}
                    </InternalScrollableContainer>
                  </ScrollableContainerProvider>
                ) : (
                  <Box
                    flex="grow"
                    overflow="auto"
                    onScroll={updateShadows}
                    padding={8}
                    ref={contentRef}
                  >
                    {children}
                  </Box>
                )}
                {footer && (
                  <div
                    className={classnames(sheetStyles.shadowContainer, {
                      [sheetStyles.shadow]: showBottomShadow,
                    })}
                  >
                    <Box padding={8}>{footer}</Box>
                  </div>
                )}
              </Box>
            </div>
          </Backdrop>
        </div>
      </TrapFocusBehavior>
    </StopScrollBehavior>
  );
});

SheetWithForwardRef.displayName = 'Sheet';

// TODO: remove $FlowFixMe once this PR is released: https://github.com/facebook/flow/pull/8476

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
SheetWithForwardRef.propTypes = {
  _dangerousScrollableExperimentEnabled: PropTypes.bool,
  accessibilityDismissButtonLabel: PropTypes.string.isRequired,
  accessibilitySheetLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
  closeOnOutsideClick: PropTypes.bool,
  footer: PropTypes.node,
  heading: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  subHeading: PropTypes.node,
};

/*

<AnimatedSheet> component: adds animation capabilities
<AnimatedSheetWithForwardRef> component: wrapper for forwarding ref to <AnimatedSheet>, the one which gets exported

 */
const AnimatedSheetWithForwardRef: React$AbstractComponent<
  AnimatedSheetProps,
  HTMLDivElement,
> = forwardRef<AnimatedSheetProps, HTMLDivElement>(function AnimatedSheet(props, sheetRef): Node {
  const {
    _dangerousScrollableExperimentEnabled = false,
    accessibilityDismissButtonLabel,
    accessibilitySheetLabel,
    children,
    closeOnOutsideClick,
    onDismiss,
    footer,
    heading = undefined,
    size,
    subHeading = undefined,
  } = props;

  return (
    <AnimationController onDismissEnd={onDismiss}>
      {({ onDismissStart }) => (
        <SheetWithForwardRef
          _dangerousScrollableExperimentEnabled={_dangerousScrollableExperimentEnabled}
          accessibilityDismissButtonLabel={accessibilityDismissButtonLabel}
          accessibilitySheetLabel={accessibilitySheetLabel}
          closeOnOutsideClick={closeOnOutsideClick}
          footer={typeof footer === 'function' ? footer({ onDismissStart }) : footer}
          heading={heading}
          onDismiss={onDismissStart}
          ref={sheetRef}
          size={size}
          subHeading={
            typeof subHeading === 'function' ? subHeading({ onDismissStart }) : subHeading
          }
        >
          {typeof children === 'function' ? children({ onDismissStart }) : children}
        </SheetWithForwardRef>
      )}
    </AnimationController>
  );
});

AnimatedSheetWithForwardRef.displayName = 'AnimatedSheet';

// TODO: remove $FlowFixMe once this PR is released: https://github.com/facebook/flow/pull/8476

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
AnimatedSheetWithForwardRef.propTypes = {
  // $FlowFixMe[prop-missing] flow 0.135.0 upgrade
  ...SheetWithForwardRef.propTypes,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  subHeading: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

export default AnimatedSheetWithForwardRef;
