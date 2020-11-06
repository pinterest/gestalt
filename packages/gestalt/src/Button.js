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
import icons from './icons/index.js';
import styles from './Button.css';
import Text from './Text.js';
import touchableStyles from './Touchable.css';
import useFocusVisible from './useFocusVisible.js';
import useTapFeedback from './useTapFeedback.js';
import InternalLink from './InternalLink.js';
import Icon, { type IconColor } from './Icon.js';
import { useColorScheme } from './contexts/ColorScheme.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

const DEFAULT_TEXT_COLORS = {
  blue: 'white',
  gray: 'darkGray',
  red: 'white',
  transparent: 'darkGray',
  transparentWhiteText: 'white',
  white: 'darkGray',
};

const SIZE_NAME_TO_PIXEL = {
  sm: 10,
  md: 12,
  lg: 12,
};

type BaseButton = {|
  accessibilityLabel?: string,
  color?:
    | 'gray'
    | 'red'
    | 'blue'
    | 'transparent'
    | 'transparentWhiteText'
    | 'white',
  disabled?: boolean,
  iconStart?: $Keys<typeof icons>,
  iconEnd?: $Keys<typeof icons>,
  iconColor: IconColor,
  inline?: boolean,
  name?: string,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
  >,
  tabIndex?: -1 | 0,
  size?: 'sm' | 'md' | 'lg',
  text: string,
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
|};

type unionProps = ButtonType | SubmitButtonType | LinkButtonType;

type unionRefs = HTMLButtonElement | HTMLAnchorElement;

const TextWithIcons = ({
  text,
  textColor,
  iconColor,
  iconStart,
  iconEnd,
  size
}: {|
  text: Node,
  textColor: IconColor,
  iconColor: IconColor,
  iconStart: $Keys<typeof icons>,
  iconEnd: $Keys<typeof icons>,
  size: string
|}): Node => {
  const icon = (
    <Icon
      accessibilityLabel=""
      color={iconColor || textColor}
      icon={iconStart}
      size={SIZE_NAME_TO_PIXEL[size]}
    />
  );

  return (
    <Box alignItems="center" display="flex">
      {iconStart && (
        <Box display="inlineBlock" flex="none" marginEnd={2}>
          {icon}
        </Box>
      )}
      {text}
      {iconEnd && (
        <Box display="inlineBlock" flex="none" marginStart={2}>
          {icon}
        </Box>
      )}
    </Box>
  );
};

const ButtonWithForwardRef: React$AbstractComponent<
  unionProps,
  unionRefs
> = forwardRef<unionProps, unionRefs>(function Button(props, ref): Node {
  const {
    accessibilityLabel,
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    name,
    color = 'gray',
    disabled = false,
    inline = false,
    iconStart,
    iconEnd,
    iconColor,
    type,
    role,
    onClick,
    tabIndex = 0,
    selected = false,
    size = 'md',
    text,
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

  let colorClass = color === 'transparentWhiteText' ? 'transparent' : color;

  if (isDarkModeRed) {
    colorClass = 'darkModeRed';
  }

  const { isFocusVisible } = useFocusVisible();

  const buttonRoleClasses = classnames(
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
      [styles.inline]: role !== 'link' && inline,
      [styles.block]: role !== 'link' && !inline,
      [touchableStyles.tapCompress]: role !== 'link' && !disabled && isTapping,
      [focusStyles.accessibilityOutline]: !disabled && isFocusVisible,
    }
  );

  const textColor =
    (disabled && 'gray') ||
    (selected && 'white') ||
    ((isDarkModeRed || isDarkModeBlue) && 'darkGray') ||
    DEFAULT_TEXT_COLORS[color];

  const buttonText = (
    <Text align="center" color={textColor} overflow="normal" weight="bold">
      {text}
    </Text>
  );

  const handleClick = (event) => {
    if (onClick) {
      onClick({ event });
    }
  };

  const handleLinkClick = ({ event }) => handleClick(event);

  if (role === 'link') {
    const { href, rel = 'none', target = null } = props;

    return (
      <InternalLink
        accessibilityLabel={accessibilityLabel}
        colorClass={colorClass}
        disabled={disabled}
        inline={inline}
        href={href}
        onClick={handleLinkClick}
        ref={innerRef}
        rel={rel}
        tabIndex={tabIndex}
        size={size}
        target={target}
        wrappedComponent="button"
      >
        <TextWithIcons
          text={buttonText}
          textColor={textColor}
          iconStart={iconStart}
          iconEnd={iconEnd}
          iconColor={iconColor || textColor}
          size={size}
        />
      </InternalLink>
    );
  }

  const isSubmitBtn = type === 'submit';
  return (
    <button
      aria-controls={isSubmitBtn ? null : accessibilityControls}
      aria-expanded={isSubmitBtn ? null : accessibilityExpanded}
      aria-haspopup={isSubmitBtn ? null : accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={buttonRoleClasses}
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
      style={compressStyle || undefined}
      tabIndex={disabled ? null : tabIndex}
      type={isSubmitBtn ? 'submit' : 'button'}
    >
      <TextWithIcons
        text={buttonText}
        textColor={textColor}
        iconStart={iconStart}
        iconEnd={iconEnd}
        iconColor={iconColor || textColor}
        size={size}
      />
    </button>
  );
});

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
ButtonWithForwardRef.propTypes = {
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  color: PropTypes.oneOf([
    'blue',
    'gray',
    'red',
    'transparent',
    'transparentWhiteText',
    'white'
  ]),
  disabled: PropTypes.bool,
  href: PropTypes.string,
  iconEnd: PropTypes.oneOf(Object.keys(icons)),
  iconStart: PropTypes.oneOf(Object.keys(icons)),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  iconColor: PropTypes.oneOf([
    'blue',
    'darkGray',
    'eggplant',
    'gray',
    'green',
    'lightGray',
    'maroon',
    'midnight',
    'navy',
    'olive',
    'orange',
    'orchid',
    'pine',
    'purple',
    'red',
    'watermelon',
    'white',
  ]),
  inline: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  rel: (PropTypes.oneOf(['none', 'nofollow']): React$PropType$Primitive<
    'none' | 'nofollow'
  >),
  tabIndex: PropTypes.oneOf([-1, 0]),
  role: PropTypes.oneOf(['button', 'link']),
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  target: (PropTypes.oneOf([null, 'self', 'blank']): React$PropType$Primitive<
    null | 'self' | 'blank'
  >),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit'])
};

ButtonWithForwardRef.displayName = 'Button';

export default ButtonWithForwardRef;
