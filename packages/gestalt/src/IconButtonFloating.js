// @flow strict
import { forwardRef, type Node, useImperativeHandle, useRef } from 'react';
import Box from './Box.js';
import IconButton from './IconButton.js';
import icons from './icons/index.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type Props = {|
  /**
   * String that clients such as VoiceOver will read to describe the icon button. Always localize the label. See [Accessibility section](https://gestalt.pinterest.systems/web/modalalert#Accessibility) for more info.
   */
  accessibilityLabel: string,
  icon?: $Keys<typeof icons>,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| dangerouslyDisableOnNavigation: () => void |},
  >,
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
|};

/**
 * A [IconButtonFloating](https://gestalt.pinterest.systems/web/iconbuttonfloating) represents the primary or most common action on the screen. As the name suggests, it floats over the content and is always on top of everything on the screen. Similar to the IconButton, the floating version uses icons instead of text to convey available actions; however, it is used when the action needs to be visible at all times in a sticky way where content can scroll underneath. IconButtonFloating remains in place on scroll.

By default, it has a circular shape with a floating elevation shadow style built-in; when pressed, it will open more related actions by triggering a Dropdown or a Modal.

IconButtonFloating is typically found in the Home feed, boards, and dashboards, supporting Pinners to perform core actions.
 */
const IconButtonFloatingWithForwardRef: React$AbstractComponent<Props, HTMLButtonElement> =
  forwardRef<Props, HTMLButtonElement>(function IconButtonFloating(props: Props, ref): Node {
    const {
      accessibilityControls,
      accessibilityExpanded,
      accessibilityHaspopup,
      accessibilityLabel,
      icon,
      onClick,
    } = props;

    const innerRef = useRef(null);
    // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
    // that renders <IconButtonFloating ref={inputRef} /> to call inputRef.current.focus()
    useImperativeHandle(ref, () => innerRef.current);

    return (
      <Box borderStyle="shadow" rounding="circle">
        <IconButton
          accessibilityControls={accessibilityControls}
          accessibilityExpanded={accessibilityExpanded}
          accessibilityHaspopup={accessibilityHaspopup}
          size="xl"
          onClick={onClick}
          accessibilityLabel={accessibilityLabel}
          icon={icon}
          bgColor="white"
          ref={innerRef}
          role="button"
        />
      </Box>
    );
  });

IconButtonFloatingWithForwardRef.displayName = 'IconButtonFloating';

export default IconButtonFloatingWithForwardRef;
