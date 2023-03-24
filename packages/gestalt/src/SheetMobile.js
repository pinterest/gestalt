// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import focusStyles from './Focus.css';
import modalStyles from './Modal.css';
import Backdrop from './Backdrop.js';
import Box from './Box.js';
import Flex from './Flex.js';
import Heading from './Heading.js';
import Text from './Text.js';
import StopScrollBehavior from './behaviors/StopScrollBehavior.js';
import TrapFocusBehavior from './behaviors/TrapFocusBehavior.js';
import { useDeviceType } from './contexts/DeviceTypeProvider.js';
import InternalDismissButton from './shared/InternalDismissButton.js';
import FullPage from './SheetMobile/FullPage.js';

type Props = {|
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
   * Subtext for Modal, only renders with `heading` strings. See the [sub-heading variant](https://gestalt.pinterest.systems/web/modal#Sub-heading) for more info.
   */
  subHeading?: string,
  /**
   * Subtext for Modal, only renders with `heading` strings. See the [sub-heading variant](https://gestalt.pinterest.systems/web/modal#Sub-heading) for more info.
   */
  size?: 'default' | 'full' | 'auto',
|};

export default function SheetMobile({
  accessibilityModalLabel,
  children,
  onDismiss,
  footer,
  padding,
  heading,
  role,
  subHeading,
  size = 'default',
}: Props): Node {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  if (!isMobile) return null;

  if (size === 'full')
    return (
      <FullPage
        accessibilityModalLabel={accessibilityModalLabel}
        onDismiss={onDismiss}
        footer={footer}
        padding={padding}
        heading={heading}
        role={role}
        subHeading={subHeading}
      />
    );

  return null;
  // return (
  // <StopScrollBehavior>
  //   <TrapFocusBehavior>
  //     <div
  //       id={id}
  //       aria-label={accessibilityModalLabel}
  //       className={modalStyles.container}
  //       role={role}
  //     >
  //       <Backdrop closeOnOutsideClick={false}>
  //         <div
  //           className={classnames(modalStyles.mobileWrapper, focusStyles.hideOutline)}
  //           tabIndex={-1}
  //           style={{ width: '100%' }}
  //         >
  //           <Box flex="grow" position="relative" display="flex" direction="column" width="100%">
  //             <Box
  //               padding={4}
  //               borderStyle={showTopShadow ? 'raisedTopShadow' : undefined}
  //               position="relative"
  //               fit
  //             >
  //               <Flex justifyContent="center" alignItems="center" gap={4}>
  //                 <Flex.Item flex="none">
  //                   <InternalDismissButton
  //                     accessibilityLabel={accessibilityDismissButtonLabel}
  //                     accessibilityControls={id}
  //                     onClick={() => onDismiss()}
  //                     ref={dismissButtonRef}
  //                     size="lg"
  //                   />
  //                 </Flex.Item>

  //                 {Boolean(heading) && (
  //                   <Flex.Item flex="grow">
  //                     {typeof heading === 'string' ? (
  //                       <Heading size="400" accessibilityLevel={1} align={align} lineClamp={2}>
  //                         {heading}
  //                       </Heading>
  //                     ) : (
  //                       heading
  //                     )}
  //                   </Flex.Item>
  //                 )}
  //               </Flex>
  //             </Box>

  //             <Box
  //               padding={padding === 'none' ? 0 : 4}
  //               flex="grow"
  //               overflow="auto"
  //               onScroll={updateShadows}
  //               ref={contentRef}
  //             >
  //               {subHeading && (
  //                 <Box marginBottom={4} padding={padding === 'none' ? 4 : 0}>
  //                   <Text weight="bold" size="300">
  //                     {subHeading}
  //                   </Text>
  //                 </Box>
  //               )}
  //               {children}
  //             </Box>

  //             {Boolean(footer) && (
  //               <Box
  //                 borderStyle={showBottomShadow ? 'raisedBottomShadow' : undefined}
  //                 position="relative"
  //                 fit
  //               >
  //                 <Box padding={4}>{footer}</Box>
  //               </Box>
  //             )}
  //           </Box>
  //         </div>
  //       </Backdrop>
  //     </div>
  //   </TrapFocusBehavior>
  // </StopScrollBehavior>
  // );
}
