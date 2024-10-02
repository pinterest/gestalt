import { forwardRef, useImperativeHandle, useRef } from 'react';
import InternalIconButton from './IconButton/InternalIconButton';
import icons from './icons/index';
import { Indexable } from './zIndex';

type Props = {
  /**
   * Label for screen readers to announce IconButton. See the [Accessibility](https://gestalt.pinterest.systems/web/iconbutton#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityLabel: string;
  /**
   * Specifies the `id` of an associated element (or elements) whose contents or visibility are controlled by IconButton so that screen reader users can identify the relationship between elements. See the [Accessibility](https://gestalt.pinterest.systems/web/iconbutton#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityControls?: string;
  /**
   * Indicates that IconButton hides or exposes collapsible components and expose whether they are currently expanded or collapsed. See the [Accessibility](https://gestalt.pinterest.systems/web/iconbutton#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityExpanded?: boolean;
  /**
   * Indicates that a component controls the appearance of interactive popup elements, such as menu or dialog. See the [Accessibility](https://gestalt.pinterest.systems/web/iconbutton#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityHaspopup?: boolean;
  /**
   * Indicates whether this component displays a menu, such as Dropdown, or a dialog, like Popover, Modal or ModalAlert. See the [Accessibility](https://gestalt.pinterest.systems/web/iconbutton#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityPopupRole?: 'menu' | 'dialog';
  /**
   * Indicates whether this component is hosted in a light or dark container.
   * Used for improving focus ring color contrast.
   */
  focusColor?: 'lightBackground' | 'darkBackground';
  /**
   * Primary colors to apply to the IconButton background.
   */
  bgColor?:
    | 'transparent'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'washLight'
    | 'white'
    | 'red';
  /**
   * Defines a new icon different from the built-in Gestalt icons.
   */
  dangerouslySetSvgPath?: {
    __path: string;
  };
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * When disabled, IconButton looks inactive and cannot be interacted with.
   */
  disabled?: boolean;
  /**
   * Icon displayed in IconButton to convey the behavior of the component. Refer to the [iconography](/foundations/iconography/library#Search-icon-library) guidelines regarding the available icon options.
   */
  icon?: keyof typeof icons;
  /**
   * Primary color to apply to the [Icon](/web/icon). See [icon color](https://gestalt.pinterest.systems/web/iconbutton#Icon-color) variant to learn more.
   */
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | 'light' | 'dark';
  /**
   * Visible label for the IconButton. Only visible in XL size IconButtons. See the [label](https://gestalt.pinterest.systems/web/iconbutton#Label) variant to learn more.
   */
  label?: string;
  /**
   * The name attribute specifies the name of the button element. The name attribute is used to reference form-data after the form has been submitted and for [testing](https://testing-library.com/docs/queries/about/#priority).
   */
  name?: string;
  /**
   * Callback fired when the component is clicked, pressed or tapped.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
  }) => void;
  /**
   * Sets a padding for the IconButton. See the [size](#Size) variant to learn more.
   */
  padding?: 1 | 2 | 3 | 4 | 5;
  /**
   * Ref that is forwarded to the underlying button element.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  ref?: HTMLButtonElement;
  /**
   * Toggles between binary states: on/off, selected/unselected, open/closed. See the [selected](https://gestalt.pinterest.systems/web/iconbutton#Selected-state) variant to learn more.
   */
  selected?: boolean;
  /**
   * The maximum height and width of IconButton. See the [size](https://gestalt.pinterest.systems/web/iconbutton#Size) variant to learn more.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Removes IconButton from sequential keyboard navigation to improve accessibility. See the [Accessibility](https://gestalt.pinterest.systems/web/iconbutton#Keyboard-interaction) guidelines for details on proper usage.
   */
  tabIndex?: -1 | 0;
  /**
   * Adds a [Tooltip](/web/tooltip) on hover/focus of the IconButton.
   */
  tooltip?: {
    accessibilityLabel?: string;
    inline?: boolean;
    idealDirection?: 'up' | 'right' | 'down' | 'left';
    text: string;
    zIndex?: Indexable;
  };
  /**
   * Use "submit" if IconButton is used within or associated with a form.
   */
  type?: 'submit' | 'button';
};

/**
 * [IconButton](https://gestalt.pinterest.systems/web/iconbutton) allows users to take actions and make choices with a single click or tap. IconButtons use icons instead of text to convey available actions on a screen. IconButton is typically found in forms, dialogs and toolbars.
 Some buttons are specialized for particular tasks, such as navigation or presenting menus.
 *
 * ![IconButton light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton.spec.ts-snapshots/IconButton-chromium-darwin.png)
 * ![IconButton dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton-dark.spec.ts-snapshots/IconButton-dark-chromium-darwin.png)
 *
 */

const IconButtonWithForwardRef = forwardRef<HTMLButtonElement, Props>(function IconButton(
  {
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityLabel,
    accessibilityPopupRole,
    bgColor,
    focusColor = 'lightBackground',
    dangerouslySetSvgPath,
    dataTestId,
    disabled,
    icon,
    iconColor,
    label,
    name,
    onClick,
    padding,
    selected,
    size = 'lg',
    tabIndex = 0,
    tooltip,
    type,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLButtonElement>(null);
  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <IconButton ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLButtonElement | null' is not assignable to type 'HTMLButtonElement'.
  useImperativeHandle(ref, () => innerRef.current);

  return (
    <InternalIconButton
      ref={innerRef}
      accessibilityControls={accessibilityControls}
      accessibilityExpanded={accessibilityExpanded}
      accessibilityHaspopup={accessibilityHaspopup}
      accessibilityLabel={accessibilityLabel}
      accessibilityPopupRole={accessibilityPopupRole}
      bgColor={bgColor}
      dangerouslySetSvgPath={dangerouslySetSvgPath}
      dataTestId={dataTestId}
      disabled={disabled}
      focusColor={focusColor}
      icon={icon}
      iconColor={iconColor}
      label={label}
      name={name}
      onClick={onClick}
      padding={padding}
      selected={selected}
      size={size}
      tabIndex={tabIndex}
      tooltip={tooltip}
      type={type === 'submit' ? 'submit' : 'button'}
    />
  );
});

IconButtonWithForwardRef.displayName = 'IconButton';

export default IconButtonWithForwardRef;
