// @flow strict
import {
  type AbstractComponent,
  forwardRef,
  type Node,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import styles from './IconButton.css';
import icons from './icons/index.js';
import Pog from './Pog.js';
import touchableStyles from './TapArea.css';
import Tooltip from './Tooltip.js';
import useFocusVisible from './useFocusVisible.js';
import useTapFeedback from './useTapFeedback.js';
import { type Indexable } from './zIndex.js';

type Props = {
  /**
   * Label for screen readers to announce IconButton. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityLabel: string,
  /**
   * Specifies the `id` of an associated element (or elements) whose contents or visibility are controlled by IconButton so that screen reader users can identify the relationship between elements. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityControls?: string,
  /**
   * Indicates that IconButton hides or exposes collapsible components and expose whether they are currently expanded or collapsed. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityExpanded?: boolean,
  /**
   * Indicates that a component controls the appearance of interactive popup elements, such as menu or dialog. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityHaspopup?: boolean,
  /**
   * Indicates whether this component displays a menu, such as Dropdown, or a dialog, like Popover, Modal or ModalAlert. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.
   */
  accessibilityPopupRole?: 'menu' | 'dialog',
  /**
   * Primary colors to apply to the IconButton background.
   */
  bgColor?:
    | 'transparent'
    | 'darkGray'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red',
  /**
   * Defines a new icon different from the built-in Gestalt icons.
   */
  dangerouslySetSvgPath?: { __path: string },
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string,
  /**
   * When disabled, IconButton looks inactive and cannot be interacted with.
   */
  disabled?: boolean,
  /**
   * Icon displayed in IconButton to convey the behavior of the component. Refer to the [iconography](/foundations/iconography/library#Search-icon-library) guidelines regarding the available icon options.
   */
  icon?: $Keys<typeof icons>,
  /**
   * Primary color to apply to the [Icon](/web/icon). See [icon color](#Icon-color) variant to learn more.
   */
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary',
  /**
   * The name attribute specifies the name of the button element. The name attribute is used to reference form-data after the form has been submitted and for [testing](https://testing-library.com/docs/queries/about/#priority).
   */
  name?: string,
  /**
   * Callback fired when the component is clicked, pressed or tapped.
   */
  onClick?: ({
    event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement>,
  }) => void,
  /**
   * Sets a padding for the IconButton. See the [size](#Size) variant to learn more.
   */
  padding?: 1 | 2 | 3 | 4 | 5,
  /**
   * Ref that is forwarded to the underlying button element.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  ref?: HTMLButtonElement,
  /**
   * Toggles between binary states: on/off, selected/unselected, open/closed. See the [selected](#Selected-state) variant to learn more.
   */
  selected?: boolean,
  /**
   * The maximum height and width of IconButton. See the [size](#Size) variant to learn more.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  /**
   * Removes IconButton from sequential keyboard navigation to improve accessibility. See the [Accessibility](#Keyboard-interaction) guidelines for details on proper usage.
   */
  tabIndex?: -1 | 0,
  /**
   * Adds a [Tooltip](/web/tooltip) on hover/focus of the IconButton.
   */
  tooltip?: {
    accessibilityLabel?: string,
    inline?: boolean,
    idealDirection?: 'up' | 'right' | 'down' | 'left',
    text: string,
    zIndex?: Indexable,
  },
  /**
   * Use "submit" if IconButton is used within or associated with a form.
   */
  type?: 'submit' | 'button',
};

/**
 * [IconButton](https://gestalt.pinterest.systems/web/iconbutton) allows users to take actions and make choices with a single click or tap. IconButtons use icons instead of text to convey available actions on a screen. IconButton is typically found in forms, dialogs and toolbars.
 Some buttons are specialized for particular tasks, such as navigation or presenting menus.
 *
 * ![IconButton light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton.spec.mjs-snapshots/IconButton-chromium-darwin.png)
 * ![IconButton dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton-dark.spec.mjs-snapshots/IconButton-dark-chromium-darwin.png)
 *
 */
const IconButtonWithForwardRef: AbstractComponent<Props, HTMLButtonElement> = forwardRef<
  Props,
  HTMLButtonElement,
>(function IconButton(
  {
    accessibilityLabel,
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityPopupRole,
    name,
    selected,
    type,
    bgColor,
    dangerouslySetSvgPath,
    dataTestId,
    disabled,
    icon,
    iconColor,
    onClick,
    padding,
    tabIndex = 0,
    tooltip,
    size = 'lg',
  }: Props,
  ref,
): Node {
  const innerRef = useRef<null | HTMLButtonElement>(null);
  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <IconButton ref={inputRef} /> to call inputRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  const {
    compressStyle,
    isTapping,
    handleBlur,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchCancel,
    handleTouchEnd,
  } = useTapFeedback({
    height: innerRef?.current?.clientHeight,
    width: innerRef?.current?.clientWidth,
  });

  const [isActive, setActive] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const { isFocusVisible } = useFocusVisible();

  const buttonComponent = (
    <button
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityPopupRole || accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classnames(styles.parentButton)}
      data-test-id={dataTestId}
      disabled={disabled}
      name={name}
      onBlur={() => {
        handleBlur();
        setFocused(false);
      }}
      onClick={(event) => onClick?.({ event })}
      onFocus={() => setFocused(true)}
      onMouseDown={() => {
        handleMouseDown();
        setActive(true);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setActive(false);
        setHovered(false);
      }}
      onMouseUp={() => {
        handleMouseUp();
        setActive(false);
      }}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      ref={innerRef}
      tabIndex={disabled ? null : tabIndex}
      // react/button-has-type is very particular about this verbose syntax
      type={type === 'submit' ? 'submit' : 'button'}
    >
      <div
        className={classnames(styles.button, touchableStyles.tapTransition, {
          [styles.disabled]: disabled,
          [styles.enabled]: !disabled,
          [touchableStyles.tapCompress]: !disabled && isTapping,
        })}
        style={compressStyle || undefined}
      >
        <Pog
          active={!disabled && isActive}
          bgColor={bgColor}
          dangerouslySetSvgPath={dangerouslySetSvgPath}
          focused={!disabled && isFocusVisible && isFocused}
          hovered={!disabled && isHovered}
          icon={icon}
          iconColor={iconColor}
          padding={padding}
          selected={selected}
          size={size}
        />
      </div>
    </button>
  );

  return tooltip?.text ? (
    <Tooltip
      accessibilityLabel={tooltip.accessibilityLabel}
      inline={tooltip.inline}
      idealDirection={tooltip.idealDirection}
      text={tooltip.text}
      zIndex={tooltip.zIndex}
    >
      {buttonComponent}
    </Tooltip>
  ) : (
    buttonComponent
  );
});

IconButtonWithForwardRef.displayName = 'IconButton';

export default IconButtonWithForwardRef;
