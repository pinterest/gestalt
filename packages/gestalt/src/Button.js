// @flow strict
import {
  type AbstractComponent,
  forwardRef,
  Fragment,
  type Node,
  useImperativeHandle,
  useRef,
} from 'react';
import classnames from 'classnames';
import NewTabAccessibilityLabel from './accessibility/NewTabAccessibilityLabel.js';
import styles from './Button.css';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import Flex from './Flex.js';
import focusStyles from './Focus.css';
import Icon, { type IconColor } from './Icon.js';
import icons from './icons/index.js';
import touchableStyles from './TapArea.css';
import Text from './Text.js';
import useFocusVisible from './useFocusVisible.js';
import useTapFeedback from './useTapFeedback.js';

const DEFAULT_TEXT_COLORS = {
  blue: 'inverse',
  gray: 'default',
  red: 'inverse',
  transparent: 'default',
  semiTransparentWhite: 'default',
  transparentWhiteText: 'inverse',
  white: 'default',
};

const SIZE_NAME_TO_PIXEL = {
  sm: 10,
  md: 12,
  lg: 12,
};

type Target = null | 'self' | 'blank';

type Props = {
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel?: string,
  color?:
    | 'gray'
    | 'red'
    | 'blue'
    | 'transparent'
    | 'semiTransparentWhite'
    | 'transparentWhiteText'
    | 'white',
  dataTestId?: string,
  disabled?: boolean,
  fullWidth?: boolean,
  iconEnd?: $Keys<typeof icons>,
  name?: string,
  onClick?: ({
    event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement>,
  }) => void,
  selected?: boolean,
  size?: 'sm' | 'md' | 'lg',
  tabIndex?: -1 | 0,
  text: string,
  type?: 'button' | 'submit',
};

function InternalButtonContent({
  target,
  text,
  textColor,
  icon,
  size,
}: {
  target?: Target,
  text: Node,
  textColor: IconColor,
  icon?: $Keys<typeof icons>,
  size: string,
}): Node {
  return (
    <Fragment>
      <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
        {text}
        {icon ? (
          <Icon
            accessibilityLabel=""
            color={textColor}
            icon={icon}
            size={SIZE_NAME_TO_PIXEL[size]}
          />
        ) : null}
      </Flex>
      <NewTabAccessibilityLabel target={target} />
    </Fragment>
  );
}

/**
 * [Buttons](https://gestalt.pinterest.systems/web/button) allow users to perform actions within a surface. They can be used alone for immediate action, or as a trigger for another component, like [Dropdown](https://gestalt.pinterest.systems/web/dropdown) or [Popover](https://gestalt.pinterest.systems/web/popover).
 *
 * ![Button light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button.spec.mjs-snapshots/Button-chromium-darwin.png)
 * ![Button dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button-dark.spec.mjs-snapshots/Button-dark-chromium-darwin.png)
 *
 */
const ButtonWithForwardRef: AbstractComponent<Props, HTMLButtonElement> = forwardRef<
  Props,
  HTMLButtonElement,
>(function Button(
  {
    accessibilityLabel,
    color = 'gray',
    dataTestId,
    disabled = false,
    fullWidth = false,
    iconEnd,
    onClick,
    tabIndex = 0,
    selected = false,
    size = 'md',
    text,
    type,
    name,
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
  }: Props,
  ref,
): Node {
  const innerRef = useRef<null | HTMLButtonElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <Button ref={inputRef} /> to call inputRef.current.focus()
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

  const { name: colorSchemeName } = useColorScheme();
  // We need to make a few exceptions for accessibility reasons in darkMode for red buttons
  const isDarkMode = colorSchemeName === 'darkMode';
  const isDarkModeRed = isDarkMode && color === 'red';
  const isDarkModeBlue = isDarkMode && color === 'blue';

  let colorClass = color === 'transparentWhiteText' ? 'transparent' : color;

  if (isDarkModeRed) {
    colorClass = 'darkModeRed';
  }

  const { isFocusVisible } = useFocusVisible();

  const sharedTypeClasses = classnames(styles.button, focusStyles.hideOutline, {
    [styles.inline]: !fullWidth,
    [styles.block]: fullWidth,
    [focusStyles.accessibilityOutline]: !disabled && isFocusVisible,
  });

  const baseTypeClasses = classnames(sharedTypeClasses, touchableStyles.tapTransition, {
    [styles.sm]: size === 'sm',
    [styles.md]: size === 'md',
    [styles.lg]: size === 'lg',
    // $FlowFixMe[invalid-computed-prop]
    [styles[colorClass]]: !disabled && !selected,
    [styles.selected]: !disabled && selected,
    [styles.disabled]: disabled,
    [styles.enabled]: !disabled,
    [touchableStyles.tapCompress]: !disabled && isTapping,
  });

  const parentButtonClasses = classnames(sharedTypeClasses, styles.parentButton);

  const childrenDivClasses = classnames(baseTypeClasses, styles.childrenDiv);

  const textColor =
    (disabled && 'subtle') ||
    (selected && 'inverse') ||
    ((isDarkModeRed || isDarkModeBlue) && 'default') ||
    DEFAULT_TEXT_COLORS[color];

  const buttonText = (
    <Text align="center" color={textColor} overflow="normal" weight="bold">
      {text}
    </Text>
  );

  if (type === 'submit') {
    return (
      <button
        aria-label={accessibilityLabel}
        className={baseTypeClasses}
        data-test-id={dataTestId}
        disabled={disabled}
        name={name}
        onBlur={handleBlur}
        onClick={(event) => onClick?.({ event })}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchCancel={handleTouchCancel}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={innerRef}
        style={compressStyle || undefined}
        tabIndex={disabled ? null : tabIndex}
        type="submit"
      >
        <InternalButtonContent text={buttonText} textColor={textColor} icon={iconEnd} size={size} />
      </button>
    );
  }

  return (
    <button
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={parentButtonClasses}
      data-test-id={dataTestId}
      disabled={disabled}
      name={name}
      onBlur={handleBlur}
      onClick={(event) => onClick?.({ event })}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      ref={innerRef}
      tabIndex={disabled ? null : tabIndex}
      type="button"
    >
      <div className={childrenDivClasses} style={compressStyle || undefined}>
        {iconEnd ? (
          <InternalButtonContent
            text={buttonText}
            textColor={textColor}
            icon={iconEnd}
            size={size}
          />
        ) : (
          buttonText
        )}
      </div>
    </button>
  );
});

ButtonWithForwardRef.displayName = 'Button';

export default ButtonWithForwardRef;
