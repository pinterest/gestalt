// @flow strict
import { forwardRef, type Node, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import styles from './Touchable.css';
import InternalLink from './InternalLink.js';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import getRoundingClassName, { type Rounding } from './getRoundingClassName.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import { type AriaCurrent } from './ariaTypes.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';

type FocusEventHandler = AbstractEventHandler<
  SyntheticFocusEvent<HTMLDivElement> | SyntheticFocusEvent<HTMLAnchorElement>,
>;

type MouseEventHandler = AbstractEventHandler<
  SyntheticMouseEvent<HTMLDivElement> | SyntheticMouseEvent<HTMLAnchorElement>,
>;

type KeyboardEventHandler = AbstractEventHandler<
  SyntheticKeyboardEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
>;

export type OnTapType = AbstractEventHandler<
  | SyntheticMouseEvent<HTMLDivElement>
  | SyntheticKeyboardEvent<HTMLDivElement>
  | SyntheticMouseEvent<HTMLAnchorElement>
  | SyntheticKeyboardEvent<HTMLAnchorElement>,
  {| dangerouslyDisableOnNavigation: () => void |},
>;

type BaseTapArea = {|
  accessibilityLabel?: string,
  children?: Node,
  disabled?: boolean,
  fullHeight?: boolean,
  fullWidth?: boolean,
  mouseCursor?: 'copy' | 'grab' | 'grabbing' | 'move' | 'noDrop' | 'pointer' | 'zoomIn' | 'zoomOut',
  onBlur?: FocusEventHandler,
  onFocus?: FocusEventHandler,
  onKeyDown?: KeyboardEventHandler,
  onMouseDown?: MouseEventHandler,
  onMouseUp?: MouseEventHandler,
  onMouseEnter?: MouseEventHandler,
  onMouseLeave?: MouseEventHandler,
  onTap?: OnTapType,
  tabIndex?: -1 | 0,
  rounding?: Rounding,
  tapStyle?: 'none' | 'compress',
|};
type TapAreaType = {|
  ...BaseTapArea,
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  role?: 'button',
|};

type LinkTapAreaType = {|
  ...BaseTapArea,
  accessibilityCurrent?: AriaCurrent,
  href: string,
  rel?: 'none' | 'nofollow',
  role: 'link',
  target?: null | 'self' | 'blank',
|};

type unionProps = TapAreaType | LinkTapAreaType;
type unionRefs = HTMLDivElement | HTMLAnchorElement;

/**
 * https://gestalt.pinterest.systems/tapArea
 */
const TapAreaWithForwardRef: React$AbstractComponent<unionProps, unionRefs> = forwardRef<
  unionProps,
  unionRefs,
>(function TapArea(props: unionProps, ref): Node {
  const {
    accessibilityLabel,
    children,
    disabled = false,
    fullHeight,
    fullWidth = true,
    mouseCursor = 'pointer',
    onBlur,
    onKeyDown,
    onFocus,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onTap,
    tabIndex = 0,
    rounding = 0,
    tapStyle = 'none',
  } = props;

  const innerRef = useRef(null);

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

  const { isFocusVisible } = useFocusVisible();

  const buttonRoleClasses = classnames(
    focusStyles.hideOutline,
    styles.tapTransition,
    getRoundingClassName(rounding),
    {
      [focusStyles.accessibilityOutline]: !disabled && isFocusVisible,
      [styles.fullHeight]: fullHeight,
      [styles.fullWidth]: fullWidth,
      [styles[mouseCursor]]: !disabled,
      [styles.tapCompress]:
        props.role !== 'link' && !disabled && tapStyle === 'compress' && isTapping,
    },
  );

  const handleKeyPress = (event) => {
    // Check to see if space or enter were pressed
    if (!disabled && onTap && keyPressShouldTriggerTap(event)) {
      // Prevent the default action to stop scrolling when space is pressed
      // TODO: this may be preventing ENTER keypress events coming from Buttons/IconButtons within a TapArea
      event.preventDefault();
      onTap({ event, dangerouslyDisableOnNavigation: () => {} });
    }
  };

  const handleClick = (event, dangerouslyDisableOnNavigation) =>
    !disabled && onTap
      ? onTap({
          event,
          dangerouslyDisableOnNavigation: dangerouslyDisableOnNavigation ?? (() => {}),
        })
      : undefined;

  const handleLinkClick = ({ event, dangerouslyDisableOnNavigation }) =>
    handleClick(event, dangerouslyDisableOnNavigation);

  const handleOnBlur = (event) => {
    if (!disabled && onBlur) {
      onBlur({ event });
    }
  };

  const handleLinkOnBlur = ({ event }) => handleOnBlur(event);

  const handleOnFocus = (event) => {
    if (!disabled && onFocus) {
      onFocus({ event });
    }
  };

  const handleLinkOnFocus = ({ event }) => handleOnFocus(event);

  const handleOnKeyDown = (event) => {
    if (!disabled && onKeyDown) onKeyDown({ event });
  };

  const handleLinkOnKeyDown = ({ event }) => handleOnKeyDown(event);

  const handleOnMouseEnter = (event) => {
    if (!disabled && onMouseEnter) {
      onMouseEnter({ event });
    }
  };

  const handleLinkOnMouseEnter = ({ event }) => handleOnMouseEnter(event);

  const handleOnMouseLeave = (event) => {
    if (!disabled && onMouseLeave) {
      onMouseLeave({ event });
    }
  };

  const handleLinkOnMouseLeave = ({ event }) => handleOnMouseLeave(event);

  if (props.role === 'link') {
    const { accessibilityCurrent, href, rel = 'none', target = null } = props;

    return (
      <InternalLink
        accessibilityCurrent={accessibilityCurrent}
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        href={href}
        fullHeight={fullHeight}
        fullWidth={fullWidth}
        mouseCursor={mouseCursor}
        onClick={handleLinkClick}
        onBlur={handleLinkOnBlur}
        onFocus={handleLinkOnFocus}
        onKeyDown={handleLinkOnKeyDown}
        // $FlowFixMe[incompatible-type-arg] Need to refine: "`HTMLDivElement` is incompatible with `HTMLAnchorElement`"
        onMouseDown={onMouseDown}
        // $FlowFixMe[incompatible-type-arg] Need to refine: "`HTMLDivElement` is incompatible with `HTMLAnchorElement`"
        onMouseUp={onMouseUp}
        onMouseEnter={handleLinkOnMouseEnter}
        onMouseLeave={handleLinkOnMouseLeave}
        ref={innerRef}
        rel={rel}
        tabIndex={tabIndex}
        rounding={rounding}
        tapStyle={tapStyle}
        target={target}
        wrappedComponent="tapArea"
      >
        {children}
      </InternalLink>
    );
  }

  const { accessibilityControls, accessibilityExpanded, accessibilityHaspopup } = props;
  return (
    <div
      aria-controls={accessibilityControls}
      aria-disabled={disabled}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={buttonRoleClasses}
      onClick={handleClick}
      onBlur={(event) => {
        handleOnBlur(event);
        handleBlur();
      }}
      onKeyDown={handleOnKeyDown}
      onFocus={handleOnFocus}
      onMouseDown={(event) => {
        onMouseDown?.({ event });
        handleMouseDown();
      }}
      onMouseUp={(event) => {
        onMouseUp?.({ event });
        handleMouseUp();
      }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onKeyPress={handleKeyPress}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      ref={innerRef}
      role="button"
      {...(tapStyle === 'compress' && compressStyle && !disabled ? { style: compressStyle } : {})}
      tabIndex={disabled ? null : tabIndex}
    >
      {children}
    </div>
  );
});

TapAreaWithForwardRef.displayName = 'TapArea';

export default TapAreaWithForwardRef;
