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

type Props = {|
  accessibilityLabel: string,
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityPopupRole?: 'menu' | 'dialog',
  bgColor?:
    | 'transparent'
    | 'darkGray'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red',
  dangerouslySetSvgPath?: {| __path: string |},
  dataTestId?: string,
  disabled?: boolean,
  icon?: $Keys<typeof icons>,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary',
  name?: string,
  onClick?: ({|
    event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement>,
  |}) => void,
  padding?: 1 | 2 | 3 | 4 | 5,
  selected?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  tabIndex?: -1 | 0,
  tooltip?: {|
    accessibilityLabel?: string,
    inline?: boolean,
    idealDirection?: 'up' | 'right' | 'down' | 'left',
    text: string,
    zIndex?: Indexable,
  |},
  type?: 'submit' | 'button',
|};

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
      onClick={onClick}
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

  return tooltip?.text && !disabled ? (
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
