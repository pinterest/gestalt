// @flow strict
import React, {
  forwardRef,
  useCallback,
  useState,
  useEffect,
  useRef,
  type Node,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ESCAPE } from './keyCodes.js';
import { useAnimation } from './AnimationController.js';
import Box from './Box.js';
import Backdrop from './Backdrop.js';
import focusStyles from './Focus.css';
import IconButton from './IconButton.js';
import Heading from './Heading.js';
import Row from './Row.js';
import StopScrollBehavior from './behaviors/StopScrollBehavior.js';
import sheetStyles from './Sheet.css';
import TrapFocusBehavior from './behaviors/TrapFocusBehavior.js';

type Props = {|
  accessibilityDismissButtonLabel: string,
  accessibilitySheetLabel: string,
  children?: Node,
  closeOnOutsideClick?: boolean,
  footer?: Node,
  heading?: string,
  onDismiss: () => void,
  size?: 'sm' | 'md' | 'lg',
|};

const SIZE_WIDTH_MAP = {
  sm: 540,
  md: 720,
  lg: 900,
};

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

const SheetWithForwardRef: React$AbstractComponent<
  Props,
  HTMLDivElement
> = forwardRef<Props, HTMLDivElement>(function Sheet(props, sheetRef): Node {
  const {
    accessibilityDismissButtonLabel,
    accessibilitySheetLabel,
    children,
    closeOnOutsideClick = true,
    onDismiss,
    footer,
    heading,
    size = 'sm',
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
      hasVerticalScrollbar &&
        target.offsetHeight + target.scrollTop < target.scrollHeight
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
              className={classnames(
                sheetStyles.wrapper,
                focusStyles.hideOutline,
                {
                  [sheetStyles.wrapperAnimationIn]: animationState === 'in',
                  [sheetStyles.wrapperAnimationOut]: animationState === 'out',
                }
              )}
              onAnimationEnd={onAnimationEnd}
              ref={sheetRef}
              role="dialog"
              style={{ width: SIZE_WIDTH_MAP[size] }}
              tabIndex={-1}
            >
              <Box
                flex="grow"
                position="relative"
                display="flex"
                direction="column"
                width="100%"
              >
                {heading && (
                  <div
                    className={classnames(sheetStyles.shadowContainer, {
                      [sheetStyles.shadow]: showTopShadow,
                    })}
                  >
                    <Row flex="grow" justifyContent="between">
                      <Box flex="grow">
                        <Header heading={heading} />
                      </Box>
                      <Box flex="none" paddingX={6} paddingY={7}>
                        <DismissButton
                          accessibilityDismissButtonLabel={
                            accessibilityDismissButtonLabel
                          }
                          onClick={onDismiss}
                        />
                      </Box>
                    </Row>
                  </div>
                )}
                {!heading && (
                  <Box
                    display="flex"
                    flex="grow"
                    justifyContent="end"
                    marginBottom={8}
                  >
                    <Box
                      flex="none"
                      paddingX={6}
                      paddingY={7}
                      position="absolute"
                    >
                      <DismissButton
                        accessibilityDismissButtonLabel={
                          accessibilityDismissButtonLabel
                        }
                        onClick={onDismiss}
                      />
                    </Box>
                  </Box>
                )}
                <Box
                  flex="grow"
                  overflow="auto"
                  onScroll={updateShadows}
                  padding={8}
                  ref={contentRef}
                >
                  {children}
                </Box>
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

// $FlowFixMe Flow(InferError)
SheetWithForwardRef.propTypes = {
  accessibilityDismissButtonLabel: PropTypes.string.isRequired,
  accessibilitySheetLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
  closeOnOutsideClick: PropTypes.bool,
  footer: PropTypes.node,
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onDismiss: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

SheetWithForwardRef.displayName = 'Sheet';

export default SheetWithForwardRef;
