// @flow strict
import type { Node } from 'react';
import { useCallback, useState, useEffect, useRef } from 'react';
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

type Size = 'sm' | 'md' | 'lg' | number;

type Role = 'alertdialog' | 'dialog';

type Align = 'start' | 'center';

type Props = {|
  _dangerouslyDisableScrollBoundaryContainer?: boolean, // Temporary undocumented prop to disable ScrollBoundaryContainer.
  accessibilityModalLabel: string,
  align?: Align,
  children?: Node,
  closeOnOutsideClick?: boolean,
  footer?: Node,
  heading?: Node,
  onDismiss: () => void,
  role?: Role,
  size?: Size,
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
  align: 'start' | 'center',
  heading: string,
  subHeading?: string,
|}) {
  return (
    <Box justifyContent={align} padding={8}>
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

/**
 * https://gestalt.pinterest.systems/Modal
 */
export default function Modal(props: Props): Node {
  const {
    _dangerouslyDisableScrollBoundaryContainer = false,
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
            >
              <Box flex="grow" position="relative" display="flex" direction="column" width="100%">
                {Boolean(heading) && (
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
                {/* _dangerouslyDisableScrollBoundaryContainer must be kept temporarily until specific surfaces migrate from Modal to Sheet */}
                {_dangerouslyDisableScrollBoundaryContainer ? (
                  <Box flex="grow" overflow="auto" onScroll={updateShadows} ref={contentRef}>
                    {children}
                  </Box>
                ) : (
                  <ScrollBoundaryContainerProvider>
                    <InternalScrollBoundaryContainer onScroll={updateShadows} ref={contentRef}>
                      {children}
                    </InternalScrollBoundaryContainer>
                  </ScrollBoundaryContainerProvider>
                )}
                {Boolean(footer) && (
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
}

Modal.propTypes = {
  _dangerouslyDisableScrollBoundaryContainer: PropTypes.string,
  accessibilityModalLabel: PropTypes.string.isRequired,
  align: (PropTypes.oneOf(['start', 'center']): React$PropType$Primitive<Align>),
  children: PropTypes.node,
  closeOnOutsideClick: PropTypes.bool,
  footer: PropTypes.node,
  heading: PropTypes.node,
  onDismiss: PropTypes.func,
  role: (PropTypes.oneOf(['alertdialog', 'dialog']): React$PropType$Primitive<Role>),
  size: (PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['sm', 'md', 'lg']),
  ]): React$PropType$Primitive<Size>),
  subHeading: PropTypes.string,
};
