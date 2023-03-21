import { $ElementType } from 'utility-types';
import type { ElementConfig, Node } from 'react';
import 'react';
import Button from './Button';
import Link from './Link';
type Props = {
  /**
   * String that clients such as VoiceOver will read to describe SheetMobile when opened. See [Accessibility section](https://gestalt.pinterest.systems/web/sheetmobile#Accessibility) for more info.
   */
  accessibilityLabel?: string;
  /**
   * Specify the alignment of `heading` & `subHeading` strings. See the [Header variant](https://gestalt.pinterest.systems/web/sheetmobile#Heading) for more info.
   */
  align?: 'start' | 'center';
  /**
   * Adds a "back-arrow" IconButton for user interaction at the start of the header section. See the [header variant, back and forward navigation case](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  backIconButton?: {
    accessibilityLabel: string;
    onClick: (arg0: {
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>;
      onDismissStart: () => void;
    }) => void;
  };
  /**
   * Supply the element(s) that will be used as SheetMobile's main content.
   */
  children?: Node;
  /**
   * Indicate whether clicking on the backdrop (gray area) outside of SheetMobile will dismiss it or not. See the [Preventing close on outside click variant](https://gestalt.pinterest.systems/web/sheetmobile#Preventing-close-on-outside-click) for more info.
   */
  closeOnOutsideClick?: boolean;
  /**
   * Supply the element(s) that will be used as SheetMobile's custom footer. See the [footer variant](https://gestalt.pinterest.systems/web/sheetmobile#Footer) for more info.
   */
  footer?: Node;
  /**
   * Adds a "forward-arrow" IconButton for user interaction at the end of the header section.. See the [header variant, back and forward navigation case](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  forwardIconButton?: {
    accessibilityLabel: string;
    onClick: (arg0: {
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>;
      onDismissStart: () => void;
    }) => void;
  };
  /**
   * The text used for SheetMobile's heading. See the [header variant](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  heading: string;
  /**
   * Callback fired when SheetMobile's in & out animations end. See the [animation variant](https://gestalt.pinterest.systems/web/sheetmobile#Animation) to learn more.
   */
  onAnimationEnd?: (arg0: { animationState: 'in' | 'out' }) => void;
  /**
   * Callback fired when SheetMobile is dismissed. Must be used for controlling SheetMobile's visibility state.
   */
  onDismiss: () => void;
  /**
   * The main SheetMobile content section has a "default" padding. For those cases where full bleed is needed, set `padding` to "none".
   */
  padding?: 'default' | 'none';
  /**
   * Adds an primary action Button for user interaction at the end of the header section. See the [header variant, with primary action case](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  primaryAction?: {
    accessibilityLabel: string;
    href?: string;
    label: string;
    onClick: (arg0: {
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>;
      onDismissStart: () => void;
    }) => void;
    rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>;
    size?: $ElementType<ElementConfig<typeof Button>, 'size'>;
    target?: $ElementType<ElementConfig<typeof Link>, 'target'>;
  };
  /**
   * The underlying ARIA role for the SheetMobile. See the [Accessibility Role section](https://gestalt.pinterest.systems/web/sheetmobile#Role) for more info.
   */
  role?: 'alertdialog' | 'dialog';
  /**
   * Shows a dismiss button on SheetMobile. See the [header variant, dismiss button case](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  showDismissButton?: boolean;
  /**
   * Subheading for SheetMobile. See the [header variant](https://gestalt.pinterest.systems/web/sheetmobile#Header) for more info.
   */
  subHeading?: string;
  /**
   * Sets the SheetMobile's height. See the [size variant](https://gestalt.pinterest.systems/web/sheetmobile#Size) for more info.
   */
  size?: 'default' | 'full' | 'auto';
};
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
declare function SheetMobile({
  accessibilityLabel,
  align,
  backIconButton,
  children,
  closeOnOutsideClick,
  forwardIconButton,
  onAnimationEnd,
  onDismiss,
  footer,
  padding,
  primaryAction,
  heading,
  role,
  showDismissButton,
  subHeading,
  size,
}: Props): Node;
declare namespace SheetMobile {
  var DismissingElement: any;
  var displayName: string;
}
export default SheetMobile;
