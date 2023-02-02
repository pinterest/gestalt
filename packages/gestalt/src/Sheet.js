// @flow strict

import { type Node } from 'react';
import AnimationProvider from './AnimationContext.js';
import InternalSheet from './InternalSheet.js';

type NodeOrRenderProp = Node | (({| onDismissStart: () => void |}) => Node);

type Props = {|
  /**
    Supply a short, descriptive label for screen-readers as a text alternative to the Dismiss button. See the [Accessibility section](https://gestalt.pinterest.systems/web/sheet#Accessibility) for more info.
   */
  accessibilityDismissButtonLabel?: string,
  /**
   * Supply a short, descriptive label for screen-readers to contextualize the purpose of Sheet. See the [Accessibility section](https://gestalt.pinterest.systems/web/sheet#Accessibility) for more info.
   */
  accessibilitySheetLabel: string,
  /**
   * Supply the container element(s) or render prop that will be used as Sheet's main content. See the [animation variant](https://gestalt.pinterest.systems/web/sheet#Animation) for info on how to add exit animations to Sheet content..
   */
  children: NodeOrRenderProp,
  /**
   * Indicate whether clicking on the backdrop (gray area) outside of Sheet will automatically close it. See the [outside click variant](https://gestalt.pinterest.systems/web/sheet#Preventing-close-on-outside-click) for more info.
   */
  closeOnOutsideClick?: boolean,
  /**
   * Supply the container element(s) or render prop that will be used as Sheet's custom footer. See the [footer variant](https://gestalt.pinterest.systems/web/sheet#Footer) for more info..
   */
  footer?: NodeOrRenderProp,
  /**
   * The text used for Sheet's heading. Be sure to localize this text. See the [heading variant](https://gestalt.pinterest.systems/web/sheet#Heading) for more info.
   */
  heading?: string,
  /**
   * Callback fired when the Sheet in/out animations end. See the [animation](https://gestalt.pinterest.systems/web/sheet#Animation) variant to learn more.
   */
  onAnimationEnd?: ({| animationState: 'in' | 'out' |}) => void,
  /**
   * When supplied, it will disable component-controlled dismiss actions (ESC key press, backdrop click, or built-in dismiss IconButtons) and launch a confirmation Popover next to the dismiss IconButton requesting user confirmation before proceding. Pass an empty object to use the default text and labels. See the [dismiss confirmation](https://gestalt.pinterest.systems/web/sheet#Dismiss-confirmation) variant to learn more.
   */
  dismissConfirmation?: {|
    message?: string,
    subtext?: string,
    primaryAction?: {|
      accessibilityLabel?: string,
      text?: string,
      onClick?: ({|
        event:
          | SyntheticMouseEvent<HTMLButtonElement>
          | SyntheticMouseEvent<HTMLAnchorElement>
          | SyntheticKeyboardEvent<HTMLAnchorElement>
          | SyntheticKeyboardEvent<HTMLButtonElement>,
      |}) => void,
    |},
    secondaryAction?: {|
      accessibilityLabel?: string,
      text?: string,
      onClick?: ({|
        event:
          | SyntheticMouseEvent<HTMLButtonElement>
          | SyntheticMouseEvent<HTMLAnchorElement>
          | SyntheticKeyboardEvent<HTMLAnchorElement>
          | SyntheticKeyboardEvent<HTMLButtonElement>,
      |}) => void,
    |},
  |},
  /**
   * Callback fired when the Sheet is dismissed by clicking on the Dismiss button, pressing the ESC key, or clicking on the backdrop outside of the Sheet (if `closeOnOutsideClick` is true).
   */
  onDismiss: () => void,
  /**
   * Determine the width of the Sheet component. See the [size variant](#Sizes) for more info.
   */
  size?: 'sm' | 'md' | 'lg',
  /**
   * Supply the container element(s) or render prop that will be used as Sheet's sub-heading docked under the heading. See the [sub-heading variant](#Sub-heading) for more info.
   */
  subHeading?: NodeOrRenderProp,
|};

/**
 * [Sheets](https://gestalt.pinterest.systems/web/sheet ) are surfaces that allow users to view optional information or complete sub-tasks in a workflow while keeping the context of the current page. The most common example of Sheet displays content in a panel that opens from the side of the screen for the user to read or input information. Sheets have default, internal padding for content.
 *
 * ![Sheet light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Sheet.spec.mjs-snapshots/Sheet-chromium-darwin.png)
 * ![Sheet dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Sheet-dark.spec.mjs-snapshots/Sheet-dark-chromium-darwin.png)
 */
function Sheet({
  accessibilityDismissButtonLabel,
  accessibilitySheetLabel,
  children,
  closeOnOutsideClick = true,
  footer,
  heading,
  onAnimationEnd,
  dismissConfirmation,
  onDismiss,
  size = 'sm',
  subHeading,
}: Props): Node {
  return (
    <AnimationProvider onDismiss={onDismiss}>
      <InternalSheet
        accessibilityDismissButtonLabel={accessibilityDismissButtonLabel}
        accessibilitySheetLabel={accessibilitySheetLabel}
        closeOnOutsideClick={closeOnOutsideClick}
        dismissConfirmation={dismissConfirmation}
        footer={footer}
        heading={heading}
        onAnimationEnd={onAnimationEnd}
        size={size}
        subHeading={subHeading}
      >
        {children}
      </InternalSheet>
    </AnimationProvider>
  );
}

Sheet.displayName = 'Sheet';

export default Sheet;
