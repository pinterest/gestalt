// @flow strict
import { forwardRef, type Node } from 'react';
import Box from './Box.js';
import IconButton from './IconButton.js';
import icons from './icons/index.js';

type Props = {|
  /**
   * String that clients such as VoiceOver will read to describe the icon button. Always localize the label. See [Accessibility section](https://gestalt.pinterest.systems/web/iconbuttonfloating#Accessibility) for more info.
   */
  accessibilityLabel: string,
  /**
   * Icon displayed in IconButtonFloating to convey the behavior of the component. Refer to the [iconography](/foundations/iconography/library) guidelines regarding the available icon options.
   */
  icon: $Keys<typeof icons>,
  /**
   * Callback fired when the component is clicked, pressed or tapped.
   */
  onClick?: ({|
    event:
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
  /**
   * Specifies the `id` of an associated element (or elements) whose contents or visibility are controlled by IconButton so that screen reader users can identify the relationship between elements. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityControls?: string,
  /**
   * Indicates that IconButtonFloating hides or exposes collapsible components and expose whether they are currently expanded or collapsed. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityExpanded?: boolean,
  /**
   * Indicates that this component controls the appearance of interactive popup elements, such as Dropdown or Modal. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityHaspopup?: boolean,
  /**
   * Toggles between binary states: on/off, selected/unselected, open/closed
   */
  selected?: boolean,
|};

type unionRefs = HTMLButtonElement | HTMLAnchorElement;

/**
 * A [IconButtonFloating](https://gestalt.pinterest.systems/web/iconbuttonfloating) represents the primary or most common action on the screen. As the name suggests, it floats over the content and is always on top of everything on the screen. Similar to [IconButton](https://gestalt.pinterest.systems/web/iconbutton), the floating version uses icons instead of text to convey available actions; however, it is used when the action needs to be visible at all times in a sticky way where content can scroll underneath. IconButtonFloating remains in place on scroll.

By default, it has a circular shape with a [floating elevation](https://gestalt.pinterest.systems/foundations/elevation) shadow style built-in; when pressed, it will open more related actions by triggering [Dropdown](https://gestalt.pinterest.systems/web/dropdown) or [Modal](https://gestalt.pinterest.systems/web/modal).

IconButtonFloating is typically found in the Home feed, boards, and dashboards, allowing Pinners to perform core actions.
 */
const IconButtonFloatingWithForwardRef: React$AbstractComponent<Props, unionRefs> = forwardRef<
  Props,
  unionRefs,
>(function IconButtonFloating(
  {
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityLabel,
    icon,
    onClick,
    selected,
  }: Props,
  ref,
): Node {
  return (
    <Box borderStyle="shadow" rounding="circle">
      <IconButton
        accessibilityControls={accessibilityControls}
        accessibilityExpanded={accessibilityExpanded}
        accessibilityHaspopup={accessibilityHaspopup}
        accessibilityLabel={accessibilityLabel}
        bgColor="white"
        icon={icon}
        onClick={onClick}
        ref={ref}
        role="button"
        selected={selected}
        size="xl"
      />
    </Box>
  );
});

IconButtonFloatingWithForwardRef.displayName = 'IconButtonFloating';

export default IconButtonFloatingWithForwardRef;
