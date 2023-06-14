// @flow strict
import { type ElementConfig, type Node } from 'react';
import AnimationProvider from './animation/AnimationContext.js';
import DismissingElement from './animation/DismissingElement.js';
import RequestAnimationFrameProvider from './animation/RequestAnimationFrameContext.js';
import Button from './Button.js';
import { useDeviceType } from './contexts/DeviceTypeProvider.js';
import Link from './Link.js';
import FullPage from './SheetMobile/FullPage.js';
import PartialPage from './SheetMobile/PartialPage.js';
import { type Indexable } from './zIndex.js';

type Props = {|
  /**
   * Specify the alignment of `heading` & `subHeading` strings. See the [Header variant](https://gestalt.pinterest.systems/web/sheetmobile#Heading) for more info.
   */
  align?: 'start' | 'center',
  /**
   * Adds a "back-arrow" IconButton for user interaction at the start of the header section. See the [header variant, back and forward navigation case](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  backIconButton?: {|
    accessibilityLabel: string,
    onClick: ({|
      event:
        | SyntheticMouseEvent<HTMLButtonElement>
        | SyntheticKeyboardEvent<HTMLButtonElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>,
      onDismissStart: () => void,
    |}) => void,
  |},
  /**
   * Supply the element(s) that will be used as SheetMobile's main content.
   */
  children?: Node,
  /**
   * Indicate whether clicking on the backdrop (gray area) outside of SheetMobile will dismiss it or not. See the [Preventing close on outside click variant](https://gestalt.pinterest.systems/web/sheetmobile#Preventing-close-on-outside-click) for more info.
   */
  closeOnOutsideClick?: boolean,
  /**
   * Supply the element(s) that will be used as SheetMobile's custom footer. See the [footer variant](https://gestalt.pinterest.systems/web/sheetmobile#Footer) for more info.
   */
  footer?: Node,
  /**
   * Adds a "forward-arrow" IconButton for user interaction at the end of the header section.. See the [header variant, back and forward navigation case](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  forwardIconButton?: {|
    accessibilityLabel: string,
    onClick: ({|
      event:
        | SyntheticMouseEvent<HTMLButtonElement>
        | SyntheticKeyboardEvent<HTMLButtonElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>,
      onDismissStart: () => void,
    |}) => void,
  |},
  /**
   * The text used for SheetMobile's heading. See the [header variant](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  heading: string,
  /**
   * Callback fired when SheetMobile's in & out animations end. See the [animation variant](https://gestalt.pinterest.systems/web/sheetmobile#Animation) to learn more.
   */
  onAnimationEnd?: ({| animationState: 'in' | 'out' |}) => void,
  /**
   * Callback fired when SheetMobile is dismissed. Must be used for controlling SheetMobile's visibility state.
   */
  onDismiss: () => void,
  /**
   * Callback fired when clicking on the backdrop (gray area) outside of SheetMobile.
   */
  onOutsideClick?: ({|
    event: SyntheticMouseEvent<HTMLDivElement>,
  |}) => void,
  /**
   * The main SheetMobile content section has a "default" padding. For those cases where full bleed is needed, set `padding` to "none".
   */
  padding?: 'default' | 'none',
  /**
   * Adds an primary action Button for user interaction at the end of the header section. See the [header variant, with primary action case](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  primaryAction?: {|
    accessibilityLabel: string,
    href?: string,
    label: string,
    onClick: ({|
      event:
        | SyntheticMouseEvent<HTMLButtonElement>
        | SyntheticKeyboardEvent<HTMLButtonElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>,
      onDismissStart: () => void,
    |}) => void,
    rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>,
    size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
    target?: $ElementType<ElementConfig<typeof Link>, 'target'>,
  |},
  /**
   * The underlying ARIA role for the SheetMobile. See the [Accessibility Role section](https://gestalt.pinterest.systems/web/sheetmobile#Role) for more info.
   */
  role?: 'alertdialog' | 'dialog',
  /**
   * Shows a dismiss button on SheetMobile. See the [header variant, dismiss button case](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  showDismissButton?: boolean,
  /**
   * Subheading for SheetMobile. See the [header variant](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  subHeading?: string,
  /**
   * Sets the SheetMobile's height. See the [size variant](https://gestalt.pinterest.systems/web/sheetmobile#Size) for more info.
   */
  size?: 'default' | 'full' | 'auto',
  /**
   * An object representing the zIndex value of SheetMobile. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
   */
  zIndex?: Indexable,
|};

/**
 * [SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile) is a mobile only component. It is not used in desktop experiences.
 *
 * SheetMobile is a supplementary container that sits on top of the screen’s primary content and can be dismissed in order to interact with the underlying content. Sheets can contain a wide variety of information and layouts, including menu items, actions, and supplemental content.
 *
 *
 * ![SheetMobile light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SheetMobile.spec.mjs-snapshots/SheetMobile-chromium-darwin.png)
 * ![SheetMobile dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SheetMobile-dark.spec.mjs-snapshots/SheetMobile-dark-chromium-darwin.png)
 *
 */
function SheetMobile({
  align = 'start',
  backIconButton,
  children,
  closeOnOutsideClick = true,
  forwardIconButton,
  onAnimationEnd,
  onDismiss,
  onOutsideClick,
  footer,
  padding,
  primaryAction,
  heading,
  role = 'dialog',
  showDismissButton = true,
  subHeading,
  size = 'default',
  zIndex,
}: Props): Node {
  const deviceType = useDeviceType();

  const isMobile = deviceType === 'mobile';

  if (!isMobile)
    throw new Error(
      `Gestalt SheetMobile is a mobile-device only component. It should not be used in desktop experiences. Please, make sure to keep in sync [Gestalt DeviceTypeProvider](https://gestalt.pinterest.systems/web/utilities/devicetypeprovider) and the conditional rendering of this component.`,
    );

  if (size === 'full')
    return (
      <FullPage
        align={align}
        backIconButton={backIconButton}
        forwardIconButton={forwardIconButton}
        footer={footer}
        heading={heading}
        onDismiss={onDismiss}
        padding={padding}
        primaryAction={primaryAction}
        role={role}
        showDismissButton
        subHeading={subHeading}
      >
        {children}
      </FullPage>
    );

  if (['default', 'auto'].includes(size))
    return (
      <AnimationProvider>
        <RequestAnimationFrameProvider>
          <PartialPage
            align={align}
            backIconButton={backIconButton}
            closeOnOutsideClick={closeOnOutsideClick}
            forwardIconButton={forwardIconButton}
            onAnimationEnd={onAnimationEnd}
            onDismiss={onDismiss}
            onOutsideClick={onOutsideClick}
            footer={footer}
            heading={heading}
            padding={padding}
            primaryAction={primaryAction}
            role={role}
            showDismissButton={showDismissButton}
            subHeading={subHeading}
            size={size}
            zIndex={zIndex}
          >
            {children}
          </PartialPage>
        </RequestAnimationFrameProvider>
      </AnimationProvider>
    );

  throw new Error(
    `Gestalt SheetMobile only accepts three valid size values: 'default', 'auto', and 'full'. Please, provide a valid size value.`,
  );
}

SheetMobile.DismissingElement = DismissingElement;

SheetMobile.displayName = 'SheetMobile';

export default SheetMobile;
