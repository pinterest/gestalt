import { forwardRef } from 'react';
import Box from './Box';
import IconButton from './IconButton';
import icons from './icons/index';
import useInExperiment from './useInExperiment';
import { Indexable } from './zIndex';

type Props = {
  /**
   * Specifies the `id` of an associated element (or elements) whose contents or visibility are controlled by IconButtonFloating so that screen reader users can identify the relationship between elements. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/iconbuttonfloating#ARIA-attributes) for details on proper usage.
   */
  accessibilityControls?: string;
  /**
   * Used to indicates that IconButtonFloating hides or exposes a Dropdown and details whether it is currently open or closed. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/iconbuttonfloating#ARIA-attributes) for details on proper usage.
   */
  accessibilityExpanded?: boolean;
  /**
   * Indicates whether this component displays a menu, such as Dropdown, or a dialog, like Popover, Modal or ModalAlert. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/iconbuttonfloating#ARIA-attributes) for details on proper usage.
   */
  accessibilityPopupRole: 'menu' | 'dialog';
  /**
   * String that clients such as VoiceOver will read to describe the icon button. Always localize the label. See [Accessibility section](https://gestalt.pinterest.systems/web/iconbuttonfloating#Accessibility) for more info.
   */
  accessibilityLabel: string;
  /**
   * Defines a new icon different from the built-in Gestalt icons. See [custom icon](https://gestalt.pinterest.systems/web/iconbuttonfloating#Custom-icon) variant to learn more.
   */
  dangerouslySetSvgPath?: {
    __path: string;
  };
  /**
   * When disabled, IconButtonFloating looks inactive and cannot be interacted with.
   */
  disabled?: boolean;
  /**
   * Icon displayed in IconButtonFloating to convey the behavior of the component. Refer to our [iconography library](https://gestalt.pinterest.systems/foundations/iconography/library) to see available icons.
   */
  icon: keyof typeof icons;
  /**
   * Callback fired when the component is clicked, pressed or tapped.
   */
  onClick: (arg1: {
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
  }) => void;
  /**
   * Indicates whether the associated dropdown is open or closed. Not used when IconButtonFloating opens a dialog.
   */
  selected?: boolean;
  /**
   * Adds a [Tooltip](https://gestalt.pinterest.systems/web/tooltip) on hover/focus of the IconButtonFloating. See the [With Tooltip](https://gestalt.pinterest.systems/web/iconbuttonfloating#With-Tooltip) variant to learn more.
   */
  tooltip: {
    accessibilityLabel?: string;
    inline?: boolean;
    idealDirection?: 'up' | 'right' | 'down' | 'left';
    text: string;
    zIndex?: Indexable;
  };
};

/**
 * [IconButtonFloating](https://gestalt.pinterest.systems/web/iconbuttonfloating) represents the primary or most common action on the screen. As the name suggests, it floats over the content and is always on top of everything on the screen. Similar to [IconButton](https://gestalt.pinterest.systems/web/iconbutton), the floating version uses icons instead of text to convey available actions. However, it is used when the action needs to be visible at all times in a sticky way where content can scroll underneath. IconButtonFloating remains in place on scroll.
 *
 * By default, it has a circular shape with a [floating elevation](https://gestalt.pinterest.systems/foundations/elevation) shadow style built-in. When pressed, it will open more related actions by triggering [Dropdown](https://gestalt.pinterest.systems/web/dropdown) or [Modal](https://gestalt.pinterest.systems/web/modal).
 *
 * IconButtonFloating is typically found in the Home feed, boards, and dashboards, allowing Pinners to perform core actions.
 *
 * ![IconButtonFloating light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButtonFloating.spec.ts-snapshots/IconButtonFloating-chromium-darwin.png)
 * ![IconButtonFloating dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButtonFloating-dark.spec.ts-snapshots/IconButtonFloating-dark-chromium-darwin.png)
 *
 */
const IconButtonFloatingWithForwardRef = forwardRef<HTMLButtonElement, Props>(
  function IconButtonFloating(
    {
      accessibilityControls,
      accessibilityExpanded,
      accessibilityPopupRole,
      accessibilityLabel,
      dangerouslySetSvgPath,
      disabled,
      icon,
      onClick,
      selected,
      tooltip,
    }: Props,
    ref,
  ) {
    const isInVRExperiment = useInExperiment({
      webExperimentName: 'web_gestalt_visualRefresh',
      mwebExperimentName: 'web_gestalt_visualRefresh',
    });

    return (
      <Box borderStyle="shadow" color="default" rounding={isInVRExperiment ? 4 : 'circle'}>
        <IconButton
          ref={ref}
          accessibilityControls={accessibilityControls}
          accessibilityExpanded={accessibilityExpanded}
          accessibilityLabel={accessibilityLabel}
          accessibilityPopupRole={accessibilityPopupRole}
          bgColor="transparent"
          dangerouslySetSvgPath={dangerouslySetSvgPath}
          disabled={disabled}
          icon={icon}
          onClick={onClick}
          selected={selected}
          size="xl"
          tooltip={tooltip}
        />
      </Box>
    );
  },
);

IconButtonFloatingWithForwardRef.displayName = 'IconButtonFloating';

export default IconButtonFloatingWithForwardRef;
