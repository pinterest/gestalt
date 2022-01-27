// @flow strict
import type { Node } from 'react';

import { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import classnames from 'classnames';
import icons from './icons/index.js';
import InternalLink from './InternalLink.js';
import Pog from './Pog.js';
import Tooltip from './Tooltip.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import styles from './IconButton.css';
import touchableStyles from './Touchable.css';
import useTapFeedback from './useTapFeedback.js';
import useFocusVisible from './useFocusVisible.js';
import { type Indexable } from './zIndex.js';

type TooltipType = {|
  text: string,
  accessibilityLabel?: string,
  inline?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  zIndex?: Indexable,
|};

const TooltipComponent = ({
  children,
  tooltipProps,
}: {|
  children: Node,
  tooltipProps: TooltipType,
|}): Node => (tooltipProps.text ? <Tooltip {...tooltipProps}>{children}</Tooltip> : children);

type BaseIconButton = {|
  accessibilityLabel: string,
  bgColor?:
    | 'transparent'
    | 'darkGray'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red',
  dangerouslySetSvgPath?: {| __path: string |},
  disabled?: boolean,
  icon?: $Keys<typeof icons>,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| dangerouslyDisableOnNavigation: () => void |},
  >,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white',
  padding?: 1 | 2 | 3 | 4 | 5,
  tabIndex?: -1 | 0,
  tooltip?: TooltipType,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|};

type IconButtonType = {|
  ...BaseIconButton,
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  role?: 'button',
  selected?: boolean,
|};

type LinkIconButtonType = {|
  ...BaseIconButton,
  href: string,
  rel?: 'none' | 'nofollow',
  role: 'link',
  target?: null | 'self' | 'blank',
|};

type unionProps = IconButtonType | LinkIconButtonType;

type unionRefs = HTMLButtonElement | HTMLAnchorElement;

/**
 * [IconButton](https://gestalt.pinterest.systems/iconbutton) allows users to take actions and make choices with a single click or tap. IconButtons use icons instead of text to convey available actions on a screen. IconButton is typically found in forms, dialogs and toolbars.
 Some buttons are specialized for particular tasks, such as navigation or presenting menus.

 */
const IconButtonWithForwardRef: React$AbstractComponent<unionProps, unionRefs> = forwardRef<
  unionProps,
  unionRefs,
>(function IconButton(props: unionProps, ref): Node {
  const {
    accessibilityLabel,
    bgColor,
    dangerouslySetSvgPath,
    disabled,
    icon,
    iconColor,
    onClick,
    padding,
    tabIndex = 0,
    tooltip,
    size,
  } = props;

  const innerRef = useRef(null);
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

  const buttonRoleClasses = classnames(styles.button, touchableStyles.tapTransition, {
    [styles.disabled]: disabled,
    [styles.enabled]: !disabled,
    [touchableStyles.tapCompress]: props.role !== 'link' && !disabled && isTapping,
  });

  const renderPogComponent = (selected?: boolean): Node => (
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
  );

  const handleClick = (event, dangerouslyDisableOnNavigation) =>
    onClick
      ? onClick({
          event,
          dangerouslyDisableOnNavigation: dangerouslyDisableOnNavigation ?? (() => {}),
        })
      : undefined;

  const handleLinkClick = ({ event, dangerouslyDisableOnNavigation }) =>
    handleClick(event, dangerouslyDisableOnNavigation);

  const handleOnBlur = () => {
    setFocused(false);
  };

  const handleOnFocus = () => {
    setFocused(true);
  };

  const handleOnMouseDown = () => {
    setActive(true);
  };

  const handleOnMouseUp = () => {
    setActive(false);
  };

  const handleOnMouseEnter = () => {
    setHovered(true);
  };

  const handleOnMouseLeave = () => {
    setActive(false);
    setHovered(false);
  };

  const createLinkIconButton = (href, rel, target) => (
    <InternalLink
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      href={href}
      onClick={handleLinkClick}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      ref={innerRef}
      rel={rel}
      tabIndex={tabIndex}
      target={target}
      wrappedComponent="iconButton"
    >
      {renderPogComponent()}
    </InternalLink>
  );

  const createIconButton = (
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    selected,
  ) => (
    <button
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={buttonRoleClasses}
      disabled={disabled}
      onBlur={() => {
        handleBlur();
        handleOnBlur();
      }}
      onClick={handleClick}
      onFocus={handleOnFocus}
      onMouseDown={() => {
        handleMouseDown();
        handleOnMouseDown();
      }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onMouseUp={() => {
        handleMouseUp();
        handleOnMouseUp();
      }}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      ref={innerRef}
      style={compressStyle || undefined}
      tabIndex={disabled ? null : tabIndex}
      type="button"
    >
      {renderPogComponent(selected)}
    </button>
  );

  let buttonComponentToRender = null;

  if (props.role === 'link') {
    const { href, rel, target } = props;
    buttonComponentToRender = createLinkIconButton(href, rel, target);
  } else {
    const { accessibilityControls, accessibilityExpanded, accessibilityHaspopup, selected } = props;
    buttonComponentToRender = createIconButton(
      accessibilityControls,
      accessibilityExpanded,
      accessibilityHaspopup,
      selected,
    );
  }
  return tooltip ? (
    <TooltipComponent tooltipProps={tooltip}>{buttonComponentToRender}</TooltipComponent>
  ) : (
    buttonComponentToRender
  );
});

IconButtonWithForwardRef.displayName = 'IconButton';

export default IconButtonWithForwardRef;
