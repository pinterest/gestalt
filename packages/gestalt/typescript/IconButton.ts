import { $Keys } from "utility-types";
import type { Node, AbstractComponent } from "react";
import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import classnames from "classnames";
import icons from "./icons/index";
import InternalLink from "./InternalLink";
import Pog from "./Pog";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
import styles from "./IconButton.css";
import touchableStyles from "./Touchable.css";
import useTapFeedback from "./useTapFeedback";
import useFocusVisible from "./useFocusVisible";
type BaseIconButton = {
  accessibilityLabel: string;
  bgColor?:
    | "transparent"
    | "darkGray"
    | "transparentDarkGray"
    | "gray"
    | "lightGray"
    | "white"
    | "red";
  dangerouslySetSvgPath?: {
    __path: string;
  };
  disabled?: boolean;
  icon?: $Keys<typeof icons>;
  onClick?: AbstractEventHandler<
    | React.MouseEvent<HTMLButtonElement>
    | React.KeyboardEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>,
    {
      dangerouslyDisableOnNavigation: () => void;
    }
  >;
  iconColor?: "gray" | "darkGray" | "red" | "white";
  padding?: 1 | 2 | 3 | 4 | 5;
  tabIndex?: -1 | 0;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};
type IconButtonType = BaseIconButton & {
  accessibilityControls?: string;
  accessibilityExpanded?: boolean;
  accessibilityHaspopup?: boolean;
  role?: "button";
  selected?: boolean;
};
type LinkIconButtonType = BaseIconButton & {
  href: string;
  rel?: "none" | "nofollow";
  role: "link";
  target?: null | "self" | "blank";
};
type unionProps = IconButtonType | LinkIconButtonType;
type unionRefs = HTMLButtonElement | HTMLAnchorElement;

/**
 * https://gestalt.pinterest.systems/IconButton
 */
const IconButtonWithForwardRef: AbstractComponent<
  unionProps,
  unionRefs
> = forwardRef<unionProps, unionRefs>(function IconButton(
  props: unionProps,
  ref
): Node {
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
  const buttonRoleClasses = classnames(
    styles.button,
    touchableStyles.tapTransition,
    {
      [styles.disabled]: disabled,
      [styles.enabled]: !disabled,
      [touchableStyles.tapCompress]:
        props.role !== "link" && !disabled && isTapping,
    }
  );

  const renderPogComponent = (selected?: boolean): Node => {
    return (
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
  };

  const handleClick = (event, dangerouslyDisableOnNavigation) =>
    onClick
      ? onClick({
          event,
          dangerouslyDisableOnNavigation:
            dangerouslyDisableOnNavigation ?? (() => {}),
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

  if (props.role === "link") {
    const { href, rel, target } = props;
    return (
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
  }

  const {
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    selected,
  } = props;
  return (
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
});
IconButtonWithForwardRef.displayName = "IconButton";
export default IconButtonWithForwardRef;