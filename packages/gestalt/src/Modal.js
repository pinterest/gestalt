// @flow strict
import { type Node, useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Backdrop from './Backdrop.js';
import StopScrollBehavior from './behaviors/StopScrollBehavior.js';
import TrapFocusBehavior from './behaviors/TrapFocusBehavior.js';
import Box from './Box.js';
import { useDeviceType } from './contexts/DeviceTypeProvider.js';
import { ScrollBoundaryContainerProvider } from './contexts/ScrollBoundaryContainerProvider.js';
import focusStyles from './Focus.css';
import Heading from './Heading.js';
import { ESCAPE } from './keyCodes.js';
import modalStyles from './Modal.css';
import InternalScrollBoundaryContainer from './ScrollBoundaryContainer/InternalScrollBoundaryContainerWithForwardRef.js';
import FullPage from './SheetMobile/FullPage.js';
import Text from './Text.js';
import { FixedZIndex } from './zIndex.js';

type Props = {|
  /**
   * Temporary undocumented prop to disable ScrollBoundaryContainer.
   */
  _dangerouslyDisableScrollBoundaryContainer?: boolean,
  /**
   * String that clients such as VoiceOver will read to describe the modal. Always localize the label. See [Accessibility section](https://gestalt.pinterest.systems/web/modal#Accessibility) for more info.
   */
  accessibilityModalLabel: string,
  /**
   * Specify the alignment of `heading` & `subHeading` strings. See the [Heading variant](https://gestalt.pinterest.systems/web/modal#Heading) for more info.
   */
  align?: 'start' | 'center',
  /**
   * Supply the element(s) that will be used as Modal's main content. See the [Best Practices](https://gestalt.pinterest.systems/web/modal#Best-practices) for more info.
   */
  children?: Node,
  /**
   * Close the modal when you click outside of it. See the [outside click variant](https://gestalt.pinterest.systems/web/modal#Preventing-close-on-outside-click) for more info.
   */
  closeOnOutsideClick?: boolean,
  /**
   * Supply the element(s) that will be used as Modal's custom footer. See the [Best Practices](https://gestalt.pinterest.systems/web/modal#Best-practices) for more info.
   */
  footer?: Node,
  /**
   * The text used for Modal's heading. See the [Heading variant](https://gestalt.pinterest.systems/web/modal#Heading) for more info.
   */
  heading?: Node,
  /**
   * Callback fired when Modal is dismissed by clicking on the backdrop outside of the Modal (if `closeOnOutsideClick` is true).
   */
  onDismiss: () => void,
  /**
   * The main Modal content has a "default" padding. For those cases where full bleed is needed, set `padding` to "none".
   */
  padding?: 'default' | 'none',
  /**
   * The underlying ARIA role for the Modal. See the [Accessibility Role section](https://gestalt.pinterest.systems/web/modal#Role) for more info.
   */
  role?: 'alertdialog' | 'dialog',
  /**
   * Determines the width of the Modal. See the [size variant](https://gestalt.pinterest.systems/web/modal#Sizes) for more info.
   *
   * sm: `540px` | md: `720px` | lg: `900px`
   */
  size?: 'sm' | 'md' | 'lg' | number,
  /**
   * Subtext for Modal, only renders with `heading` strings. See the [sub-heading variant](https://gestalt.pinterest.systems/web/modal#Sub-heading) for more info.
   */
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
    <Box justifyContent={align} padding={6}>
      <Heading size="500" accessibilityLevel={1} align={align}>
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
 * A [Modal](https://gestalt.pinterest.systems/web/modal) displays content that requires user interaction. Modals appear on a layer above the page and therefore block the content underneath, preventing users from interacting with anything else besides the Modal. Modal should be used to gather short bits of information from the user. For confirmation of an action or acknowledgment, use [ModalAlert](https://gestalt.pinterest.systems/web/modalalert).
 *
 * ![Modal light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Modal.spec.mjs-snapshots/Modal-chromium-darwin.png)
 * ![Modal mobile](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Modal-mobile.spec.mjs-snapshots/Modal-mobile-chromium-darwin.png)
 * ![Modal dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Modal-dark.spec.mjs-snapshots/Modal-dark-chromium-darwin.png)
 *
 */
export default function Modal({
  _dangerouslyDisableScrollBoundaryContainer = false,
  accessibilityModalLabel,
  align = 'center',
  children,
  closeOnOutsideClick = true,
  onDismiss,
  footer,
  padding = 'default',
  heading,
  role = 'dialog',
  size = 'sm',
  subHeading,
}: Props): Node {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

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

  if (isMobile) {
    return (
      <FullPage
        align={align}
        onDismiss={onDismiss}
        footer={footer}
        padding={padding}
        heading={heading}
        role={role}
        subHeading={subHeading}
        showDismissButton
      >
        {children}
      </FullPage>
    );
  }

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
                  <Box
                    borderStyle={showTopShadow ? 'raisedTopShadow' : undefined}
                    position="relative"
                    fit
                    zIndex={new FixedZIndex(1)}
                  >
                    {typeof heading === 'string' ? (
                      <Header align={align} heading={heading} subHeading={subHeading} />
                    ) : (
                      <Box padding={6}>{heading}</Box>
                    )}
                  </Box>
                )}
                {/* _dangerouslyDisableScrollBoundaryContainer must be kept temporarily until specific surfaces migrate from Modal to OverlayPanel */}
                {_dangerouslyDisableScrollBoundaryContainer ? (
                  <Box
                    flex="grow"
                    overflow="auto"
                    onScroll={updateShadows}
                    ref={contentRef}
                    padding={padding === 'none' ? 0 : 6}
                  >
                    {children}
                  </Box>
                ) : (
                  <ScrollBoundaryContainerProvider>
                    <InternalScrollBoundaryContainer
                      onScroll={updateShadows}
                      ref={contentRef}
                      padding={padding === 'none' ? 0 : 6}
                    >
                      {children}
                    </InternalScrollBoundaryContainer>
                  </ScrollBoundaryContainerProvider>
                )}
                {Boolean(footer) && (
                  <Box
                    borderStyle={showBottomShadow ? 'raisedBottomShadow' : undefined}
                    position="relative"
                    fit
                    zIndex={new FixedZIndex(1)}
                  >
                    <Box padding={6}>{footer}</Box>
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
