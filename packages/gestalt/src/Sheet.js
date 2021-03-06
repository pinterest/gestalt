// @flow strict

/*

# Welcome to Sheet!

This guide will help you navigate and understand its design. This file is roughly organized like:

  1. Internal components <Header> and <DismissButton>
  2. Sheet function: the one with the actual component logic
  3. AnimatedSheet function: adds animation capabilities

This is how all these components are used:

a. The default export is <AnimatedSheet>
b. AnimatedSheet includes <Sheet>
c. Sheet is the actual component logic which includes the internal components <Header> and <DismissButton>.

*/

import type { Node } from 'react';
import { useCallback, useState, useEffect, useRef } from 'react';
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
import { ScrollBoundaryContainerWithForwardRef as InternalScrollBoundaryContainer } from './ScrollBoundaryContainer.js';
import { ScrollBoundaryContainerProvider } from './contexts/ScrollBoundaryContainer.js';

type Size = 'sm' | 'md' | 'lg';
type SheetMainProps = {|
  accessibilityDismissButtonLabel: string,
  accessibilitySheetLabel: string,
  children: Node,
  closeOnOutsideClick?: boolean,
  footer?: Node,
  onDismiss: () => void,
  size?: Size,
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

 */
function Sheet(props: SheetProps): Node {
  const {
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
  const contentRef = useRef<?HTMLElement>(null);

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
                <ScrollBoundaryContainerProvider>
                  <InternalScrollBoundaryContainer
                    onScroll={updateShadows}
                    padding={8}
                    ref={contentRef}
                  >
                    {children}
                  </InternalScrollBoundaryContainer>
                </ScrollBoundaryContainerProvider>
                {Boolean(footer) && (
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
}

Sheet.propTypes = {
  accessibilityDismissButtonLabel: PropTypes.string.isRequired,
  accessibilitySheetLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
  closeOnOutsideClick: PropTypes.bool,
  footer: PropTypes.node,
  heading: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
  size: (PropTypes.oneOf(['sm', 'md', 'lg']): React$PropType$Primitive<Size>),
  subHeading: PropTypes.node,
};

/**
 * <AnimatedSheet> component: adds animation capabilities
 */

/**
 * https://gestalt.pinterest.systems/Sheet
 */
export default function AnimatedSheet(props: AnimatedSheetProps): Node {
  const {
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
        <Sheet
          accessibilityDismissButtonLabel={accessibilityDismissButtonLabel}
          accessibilitySheetLabel={accessibilitySheetLabel}
          closeOnOutsideClick={closeOnOutsideClick}
          footer={typeof footer === 'function' ? footer({ onDismissStart }) : footer}
          heading={heading}
          onDismiss={onDismissStart}
          size={size}
          subHeading={
            typeof subHeading === 'function' ? subHeading({ onDismissStart }) : subHeading
          }
        >
          {typeof children === 'function' ? children({ onDismissStart }) : children}
        </Sheet>
      )}
    </AnimationController>
  );
}

// TODO: remove $FlowFixMe once this PR is released: https://github.com/facebook/flow/pull/8476

AnimatedSheet.propTypes = {
  ...Sheet.propTypes,
  // $FlowFixMe[signature-verification-failure]
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  footer: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  subHeading: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};
