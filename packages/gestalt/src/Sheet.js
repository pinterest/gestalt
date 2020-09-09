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
import Box from './Box.js';
import IconButton from './IconButton.js';
import Backdrop from './Backdrop.js';
import Heading from './Heading.js';
import StopScrollBehavior from './behaviors/StopScrollBehavior.js';
import TrapFocusBehavior from './behaviors/TrapFocusBehavior.js';
import styles from './Sheet.css';
import useReducedMotion from './useReducedMotion.js';

type Props = {|
  accessibilityDismissButtonLabel: string,
  accessibilitySheetLabel: string,
  children?: Node,
  closeOnOutsideClick?: boolean,
  footer?: Node,
  heading?: string | Node,
  onDismiss: () => void,
  size?: 'sm' | 'md' | 'lg' | number,
|};

const SIZE_WIDTH_MAP = {
  sm: 540,
  md: 720,
  lg: 900,
};

const ESCAPE_KEY_CODE = 27;
const ANIMATION_DURATION_IN_MS = 400;

function Header({ heading }: {| heading: string | Node |}) {
  if (typeof heading !== 'string') {
    return heading;
  }

  return (
    <Box display="flex" justifyContent="start" padding={8}>
      <Heading size="md" accessibilityLevel={1}>
        {heading}
      </Heading>
    </Box>
  );
}

/*
Currently supported sheet animations:  
- g-sheet-slide-in-ltr: slides the sheet in, from the right edge. Screen direction: ltr
- g-sheet-slide-in-rtl: slides the sheet in, from the left edge. Screen direction: rtl
- g-sheet-slide-out-ltr: slides the sheet out, from the right edge. Screen direction: ltr
- g-sheet-slide-out-rtl: slides the sheet out, from the left edge. Screen direction: rtl
*/
const getAnimation = (moment: 'in' | 'out') => {
  const documentDirection = document?.documentElement?.dir || 'ltr';
  const animations = {
    in: {
      backdrop: 'g-backdrop-fade-in',
      sheet: `g-sheet-slide-in-${documentDirection}`,
    },
    out: {
      backdrop: 'g-backdrop-fade-out',
      sheet: `g-sheet-slide-out-${documentDirection}`,
    },
  };
  return animations[moment];
};

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

  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(getAnimation('in'));
  const containerRef = useRef<?HTMLDivElement>(null);
  const contentRef = useRef<?HTMLDivElement>(null);
  const dismissButtonRef = useRef<?HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const startDismiss = useCallback(() => {
    if (shouldReduceMotion) {
      onDismiss();
    } else {
      setCurrentAnimation(getAnimation('out'));
      if (containerRef.current) {
        containerRef.current.addEventListener('animationend', onDismiss);
      }
    }
  }, [onDismiss, shouldReduceMotion]);

  useEffect(() => {
    function handleKeyUp(event: {| keyCode: number |}) {
      if (event.keyCode === ESCAPE_KEY_CODE) {
        startDismiss();
      }
    }

    window.addEventListener('keyup', handleKeyUp);
    return function cleanup() {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [startDismiss]);

  const updateShadows = () => {
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
  };

  useEffect(() => {
    updateShadows();
    window.addEventListener('resize', updateShadows);
    return () => {
      window.removeEventListener('resize', updateShadows);
    };
  }, []);

  useEffect(() => {
    if (dismissButtonRef.current) {
      dismissButtonRef.current.focus();
    }
  }, []);

  const handleOutsideClick = () => {
    if (closeOnOutsideClick) {
      startDismiss();
    }
  };

  const width = typeof size === 'string' ? SIZE_WIDTH_MAP[size] : size;

  const buildAnimationStyle = (animationName: string): { [string]: string } => {
    return shouldReduceMotion
      ? {}
      : {
          animation: `${animationName} ${ANIMATION_DURATION_IN_MS}ms ease-in-out`,
        };
  };

  const dismissButton = (
    <IconButton
      accessibilityLabel={accessibilityDismissButtonLabel}
      bgColor="white"
      icon="cancel"
      iconColor="darkGray"
      onClick={startDismiss}
      ref={dismissButtonRef}
    />
  );

  return (
    <StopScrollBehavior>
      <TrapFocusBehavior>
        <div className={styles.container} ref={containerRef}>
          <Backdrop
            animation={
              buildAnimationStyle(currentAnimation.backdrop)?.animation
            }
            closeOnOutsideClick={closeOnOutsideClick}
            onClick={handleOutsideClick}
          >
            <div
              aria-label={accessibilitySheetLabel}
              className={styles.wrapper}
              ref={sheetRef}
              role="dialog"
              style={{
                ...buildAnimationStyle(currentAnimation.sheet),
                width,
              }}
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
                    className={classnames(styles.shadowContainer, {
                      [styles.shadow]: showTopShadow,
                    })}
                  >
                    <Box display="flex" flex="grow" justifyContent="between">
                      <Box flex="grow">
                        <Header heading={heading} />
                      </Box>
                      <Box flex="none" paddingX={6} paddingY={7}>
                        {dismissButton}
                      </Box>
                    </Box>
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
                      {dismissButton}
                    </Box>
                  </Box>
                )}
                <Box
                  flex="grow"
                  overflow="auto"
                  onScroll={updateShadows}
                  ref={contentRef}
                >
                  {children}
                </Box>
                {footer && (
                  <div
                    className={classnames(styles.shadowContainer, {
                      [styles.shadow]: showBottomShadow,
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
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['sm', 'md', 'lg']),
  ]),
};

SheetWithForwardRef.displayName = 'Sheet';

export default SheetWithForwardRef;
