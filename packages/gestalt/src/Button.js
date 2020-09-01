// @flow strict

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  type Node,
} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Box from './Box.js';
import focusStyles from './Focus.css';
import Icon from './Icon.js';
import Link from './Link.js';
import icons from './icons/index.js';
import styles from './Button.css';
import Text from './Text.js';
import touchableStyles from './Touchable.css';
import useFocusVisible from './useFocusVisible.js';
import useTapFeedback from './useTapFeedback.js';
import { useColorScheme } from './contexts/ColorScheme.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

const DEFAULT_TEXT_COLORS = {
  blue: 'white',
  gray: 'darkGray',
  red: 'white',
  transparent: 'white',
  white: 'darkGray',
};

type BaseButton = {|
  accessibilityLabel?: string,
  color?: 'gray' | 'red' | 'blue' | 'transparent' | 'white',
  disabled?: boolean,
  iconEnd?: $Keys<typeof icons>,
  inline?: boolean,
  name?: string,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
  >,
  size?: 'sm' | 'md' | 'lg',
  text: string,
  textColor?: 'white' | 'darkGray' | 'blue' | 'red',
|};

type ButtonType = {|
  ...BaseButton,
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  selected?: boolean,
  type?: 'button',
  role?: 'button',
|};

type SubmitButtonType = {|
  ...BaseButton,
  type: 'submit',
  role?: 'button',
|};

type LinkButtonType = {|
  ...BaseButton,
  href: string,
  rel?: 'none' | 'nofollow',
  role: 'link',
  target?: null | 'self' | 'blank',
  role: 'link',
|};

type unionProps = ButtonType | SubmitButtonType | LinkButtonType;

type unionRefs = HTMLButtonElement | HTMLAnchorElement;

const ButtonWithForwardRef: React$AbstractComponent<
  unionProps,
  unionRefs
> = forwardRef<unionProps, unionRefs>(function Button(props, ref): Node {
  const {
    accessibilityLabel,
    color = 'gray',
    disabled = false,
    inline = false,
    iconEnd,
    onClick,
    selected = false,
    size = 'md',
    text,
    textColor: textColorProp,
  } = props;

  const innerRef = useRef(null);
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

  let colorClass = color;

  if (isDarkModeRed) {
    colorClass = 'darkModeRed';
  }

  const { isFocusVisible } = useFocusVisible();

  const classes = classnames(
    styles.button,
    focusStyles.hideOutline,
    touchableStyles.tapTransition,
    {
      [styles.sm]: size === 'sm',
      [styles.md]: size === 'md',
      [styles.lg]: size === 'lg',
      [styles[colorClass]]: !disabled && !selected,
      [styles.selected]: !disabled && selected,
      [styles.disabled]: disabled,
      [styles.enabled]: !disabled,
      [styles.inline]: props.role !== 'link' && inline,
      [styles.block]: props.role !== 'link' && !inline,
      [styles.link]: props.role === 'link',
      [touchableStyles.tapCompress]:
        props.role !== 'link' && !disabled && isTapping,
      [focusStyles.accessibilityOutline]: !disabled && isFocusVisible,
    }
  );

  const textColor =
    (disabled && 'gray') ||
    (selected && 'white') ||
    ((isDarkModeRed || isDarkModeBlue) && 'darkGray') ||
    textColorProp ||
    DEFAULT_TEXT_COLORS[color];

  const buttonText = (
    <Text align="center" color={textColor} overflow="normal" weight="bold">
      {text}
    </Text>
  );

  const iconEndComponent = (): Node => {
    const SIZE_NAME_TO_PIXEL = {
      sm: 10,
      md: 12,
      lg: 12,
    };

    return (
      <Box alignItems="center" display="flex">
        {buttonText}
        <Box display="inlineBlock" flex="none" marginStart={2}>
          <Icon
            accessibilityLabel=""
            color={textColor}
            icon={iconEnd}
            size={SIZE_NAME_TO_PIXEL[size]}
          />
        </Box>
      </Box>
    );
  };

  function handleClick(
    event:
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>
  ): void {
    if (onClick) {
      onClick({ event });
    }
  }

  function handleLinkClick({
    event,
  }: {|
    event:
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
  |}): void {
    if (onClick) {
      onClick({ event });
    }
  }

  /* eslint-disable react/button-has-type */
  if (props.role === 'link') {
    const { href, rel, target } = props;

    return (
      <Link
        accessibilityLabel={accessibilityLabel}
        _disabled={disabled}
        inline={inline}
        href={href}
        hoverStyle="none"
        onClick={handleLinkClick}
        ref={innerRef}
        rel={rel}
        rounding="pill"
        tapStyle={disabled ? undefined : 'compress'}
        target={target}
      >
        <div className={classes}>
          {iconEnd ? iconEndComponent() : buttonText}
        </div>
      </Link>
    );
  }

  if (props.type === 'submit') {
    const { name, type } = props;

    return (
      <button
        aria-label={accessibilityLabel}
        className={classes}
        disabled={disabled}
        name={name}
        onBlur={handleBlur}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchCancel={handleTouchCancel}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={innerRef}
        style={compressStyle}
        type={type}
      >
        {iconEnd ? iconEndComponent() : buttonText}
      </button>
    );
  }

  const {
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    type = 'button',
  } = props;

  return (
    <button
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classes}
      disabled={disabled}
      onBlur={handleBlur}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      ref={innerRef}
      type={type}
      {...(compressStyle ? { style: compressStyle } : {})}
    >
      {iconEnd ? iconEndComponent() : buttonText}
    </button>
  );
  /* eslint-enable react/button-has-type */
});

// $FlowFixMe Flow(InferError)
ButtonWithForwardRef.propTypes = {
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'gray', 'red', 'transparent', 'white']),
  disabled: PropTypes.bool,
  href: PropTypes.string,
  iconEnd: PropTypes.oneOf(Object.keys(icons)),
  inline: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  rel: (PropTypes.oneOf(['none', 'nofollow']): React$PropType$Primitive<
    'none' | 'nofollow'
  >),
  role: PropTypes.oneOf(['button', 'link']),
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  target: (PropTypes.oneOf([null, 'self', 'blank']): React$PropType$Primitive<
    null | 'self' | 'blank'
  >),
  text: PropTypes.string.isRequired,
  textColor: PropTypes.oneOf(['white', 'darkGray', 'blue', 'red']),
  type: PropTypes.oneOf(['button', 'submit']),
};

ButtonWithForwardRef.displayName = 'Button';

export default ButtonWithForwardRef;
