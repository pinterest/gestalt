/*

InternalDismissIconButton aims to replace "dismiss" IconButtons in components that toggle on/off their visibility, p.ex. Modal, OverlayPanel, mobile SideNavigation. When visible, we require autofocus within the component in particular the dismiss IconButton. IconButton displays a Tooltip on focus, but for this particular usage the tooltip is not required as it creates a bad UX. InternalDismissIconButton is an IconButtons replacement without tooltip.

*/

// @flow strict
import {
  type Node,
  type AbstractComponent,
  type ElementConfig,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import IconButton from './IconButton.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import { type Indexable } from './zIndex.js';

type Props = {|
  accessibilityHaspopup?: boolean,
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityPopupRole?: 'menu' | 'dialog',
  icon: 'ellipsis' | 'edit' | 'trash-can',
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| dangerouslyDisableOnNavigation: () => void |},
  >,
  tooltip: {|
    accessibilityLabel?: string,
    inline?: boolean,
    idealDirection?: 'up' | 'right' | 'down' | 'left',
    text: string,
    zIndex?: Indexable,
  |},
|};

const SideNavigationIconButtonWithForwardRef: AbstractComponent<Props, HTMLButtonElement> =
  forwardRef<Props, HTMLButtonElement>(function IconButton(
    {
      accessibilityHaspopup,
      accessibilityExpanded,
      accessibilityPopupRole,
      accessibilityControls,
      icon,
      onClick,
      tooltip,
    }: Props,
    ref,
  ): Node {
    const innerRef = useRef(null);

    // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
    // that renders <IconButton ref={inputRef} /> to call inputRef.current.focus()
    useImperativeHandle(ref, () => innerRef.current);

    return (
      <IconButton
        accessibilityHaspopup={accessibilityHaspopup}
        accessibilityControls={accessibilityControls}
        accessibilityExpanded={accessibilityExpanded}
        accessibilityPopupRole={accessibilityPopupRole}
        icon={icon}
        onClick={onClick}
        tooltip={tooltip}
        ref={innerRef}
        size="xs"
      />
    );
  });

export default SideNavigationIconButtonWithForwardRef;

SideNavigationIconButtonWithForwardRef.displayName = 'SideNavigation.IconButton';
