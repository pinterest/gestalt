// @flow strict
import React, { useCallback, forwardRef, useState, useEffect, useRef, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ESCAPE } from './keyCodes.js';
import Box from './Box.js';
import Backdrop from './Backdrop.js';
import focusStyles from './Focus.css';
import Heading from './Heading.js';
import StopScrollBehavior from './behaviors/StopScrollBehavior.js';
import Text from './Text.js';
import TrapFocusBehavior from './behaviors/TrapFocusBehavior.js';
import { ScrollBoundaryContainerWithForwardRef as InternalScrollBoundaryContainer } from './ScrollBoundaryContainer.js';
import { ScrollBoundaryContainerProvider } from './contexts/ScrollBoundaryContainer.js';
import modalStyles from './Modal.css';

type Props = {|
  _dangerousScrollableExperimentEnabled?: boolean, // Temporary undocumented prop to support experimentation inside Modal and Sheet.
  accessibilityModalLabel: string,
  align?: 'left' | 'center',
  children?: Node,
  closeOnOutsideClick?: boolean,
  footer?: Node,
  heading?: Node,
  onDismiss: () => void,
  role?: 'alertdialog' | 'dialog',
  size?: 'sm' | 'md' | 'lg' | number,
  subHeading?: string,
|};

const SIZE_WIDTH_MAP = {
  sm: 540,
  md: 720,
  lg: 900,
};

function Header({
  align,
  heading,
  subHeading,
}: {|
  align: 'left' | 'center',
  heading: string,
  subHeading?: string,
|}) {
  return (
    <Box justifyContent={align === 'left' ? 'start' : 'center'} padding={8}>
      <Heading size="md" accessibilityLevel={1} align={align}>
        {heading}
      </Heading>
      {subHeading && (
        <Box marginTop={1}>
          <Text align={align}>{subHeading}</Text>
        </Box>
      )}
    </Box>
  );
}

const ModalWithForwardRef: React$AbstractComponent<Props, HTMLDivElement> = forwardRef<
  Props,
  HTMLDivElement,
>(function Modal(props, ref): Node {
  const {
    _dangerousScrollableExperimentEnabled = false,
    accessibilityModalLabel,
    align = 'center',
    children,
    closeOnOutsideClick = true,
    onDismiss,
    footer,
    heading,
    role = 'dialog',
    size = 'sm',
    subHeading = undefined,
  } = props;

  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const contentRef = useRef<?HTMLElement>(null);

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

  const handleOutsideClick = () => {
    if (closeOnOutsideClick) {
      onDismiss();
    }
  };

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
    window.addEventListener('resize', updateShadows);
    return () => {
      window.removeEventListener('resize', updateShadows);
    };
  }, [updateShadows]);

  useEffect(() => {
    updateShadows();
  }, [updateShadows]);

  const width = typeof size === 'string' ? SIZE_WIDTH_MAP[size] : size;

  return (
    <StopScrollBehavior>
      <TrapFocusBehavior>
        <div aria-label={accessibilityModalLabel} className={modalStyles.container} role={role}>
          <Backdrop closeOnOutsideClick={closeOnOutsideClick} onClick={handleOutsideClick}>
            <div
              className={classnames(modalStyles.wrapper, focusStyles.hideOutline)}
              tabIndex={-1}
              style={{ width }}
              ref={ref}
            >
              <Box flex="grow" position="relative" display="flex" direction="column" width="100%">
                {heading && (
                  <div
                    className={classnames(modalStyles.shadowContainer, {
                      [modalStyles.shadow]: showTopShadow,
                    })}
                  >
                    {typeof heading === 'string' ? (
                      <Header align={align} heading={heading} subHeading={subHeading} />
                    ) : (
                      heading
                    )}
                  </div>
                )}
                {_dangerousScrollableExperimentEnabled ? (
                  <ScrollBoundaryContainerProvider>
                    <InternalScrollBoundaryContainer onScroll={updateShadows} ref={contentRef}>
                      {children}
                    </InternalScrollBoundaryContainer>
                  </ScrollBoundaryContainerProvider>
                ) : (
                  <Box flex="grow" overflow="auto" onScroll={updateShadows} ref={contentRef}>
                    {children}
                  </Box>
                )}
                {footer && (
                  <div
                    className={classnames(modalStyles.shadowContainer, {
                      [modalStyles.shadow]: showBottomShadow,
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

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
ModalWithForwardRef.propTypes = {
  _dangerousScrollableExperimentEnabled: PropTypes.bool,
  accessibilityModalLabel: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'center']),
  children: PropTypes.node,
  closeOnOutsideClick: PropTypes.bool,
  footer: PropTypes.node,
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onDismiss: PropTypes.func,
  role: PropTypes.oneOf(['alertdialog', 'dialog']),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['sm', 'md', 'lg'])]),
  subHeading: PropTypes.string,
};

ModalWithForwardRef.displayName = 'Modal';

export default ModalWithForwardRef;
