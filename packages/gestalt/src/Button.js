// @flow strict
import React, { forwardRef, useImperativeHandle, useRef, type Node } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Flex from './Flex.js';
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
  color?: 'gray' | 'red' | 'blue' | 'transparent' | 'transparentWhiteText' | 'white',
  disabled?: boolean,
  iconEnd?: $Keys<typeof icons>,
  inline?: boolean,
  name?: string,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>,
    {| disableOnNavigation?: () => void |},
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

const IconEnd = ({
  text,
  textColor,
  icon,
  size,
}: {|
  text: Node,
  textColor: IconColor,
  icon: $Keys<typeof icons>,
  size: string,
|}): Node => (
  <Flex alignItems="center" gap={2} justifyContent="center">
    {text}
    <Icon accessibilityLabel="" color={textColor} icon={icon} size={SIZE_NAME_TO_PIXEL[size]} />
  </Flex>
);

const ButtonWithForwardRef: React$AbstractComponent<unionProps, unionRefs> = forwardRef<
  unionProps,
  unionRefs,
>(function Button(props, ref): Node {
  const {
    accessibilityLabel,
    color = 'gray',
    disabled = false,
    inline = false,
    iconEnd,
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
      [styles.inline]: props.role !== 'link' && inline,
      [styles.block]: props.role !== 'link' && !inline,
      [touchableStyles.tapCompress]: props.role !== 'link' && !disabled && isTapping,
      [focusStyles.accessibilityOutline]: !disabled && isFocusVisible,
    },
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

  const handleClick = (event, disableOnNavigation) =>
    onClick ? onClick(disableOnNavigation ? { event, disableOnNavigation } : { event }) : undefined;

  const handleLinkClick = ({ event, disableOnNavigation }) =>
    handleClick(event, disableOnNavigation);

  if (props.role === 'link') {
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
        {iconEnd ? (
          <IconEnd text={buttonText} textColor={textColor} icon={iconEnd} size={size} />
        ) : (
          buttonText
        )}
      </InternalLink>
    );
  }

  if (props.type === 'submit') {
    const { name } = props;

    return (
      <button
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
        type="submit"
      >
        {iconEnd ? (
          <IconEnd text={buttonText} textColor={textColor} icon={iconEnd} size={size} />
        ) : (
          buttonText
        )}
      </button>
    );
  }

  const { accessibilityControls, accessibilityExpanded, accessibilityHaspopup, name } = props;

  return (
    <button
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
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
      type="button"
    >
      {iconEnd ? (
        <IconEnd text={buttonText} textColor={textColor} icon={iconEnd} size={size} />
      ) : (
        buttonText
      )}
    </button>
  );
});

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
ButtonWithForwardRef.propTypes = {
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'gray', 'red', 'transparent', 'transparentWhiteText', 'white']),
  disabled: PropTypes.bool,
  href: PropTypes.string,
  iconEnd: PropTypes.oneOf(Object.keys(icons)),
  inline: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  rel: (PropTypes.oneOf(['none', 'nofollow']): React$PropType$Primitive<'none' | 'nofollow'>),
  tabIndex: PropTypes.oneOf([-1, 0]),
  role: PropTypes.oneOf(['button', 'link']),
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  target: (PropTypes.oneOf([null, 'self', 'blank']): React$PropType$Primitive<
    null | 'self' | 'blank',
  >),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
};

ButtonWithForwardRef.displayName = 'Button';

export default ButtonWithForwardRef;
