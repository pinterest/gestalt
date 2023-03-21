// @flow strict
import { forwardRef, type Node, type AbstractComponent, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import focusStyles from './Focus.css';
import styles from './TapArea.css';
import getRoundingClassName from './getRoundingClassName.js';
import NewTabAccessibilityLabel, { getAriaLabel } from './NewTabAccessibilityLabel.js';
import useFocusVisible from './useFocusVisible.js';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import InternalLink from './Link/InternalLink.js';

type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | 'section';
type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';
type FocusEventHandler = ({|
  event: SyntheticFocusEvent<HTMLDivElement> | SyntheticFocusEvent<HTMLAnchorElement>,
|}) => void;

type MouseEventHandler = ({|
  event: SyntheticMouseEvent<HTMLDivElement> | SyntheticMouseEvent<HTMLAnchorElement>,
|}) => void;

type KeyboardEventHandler = ({|
  event: SyntheticKeyboardEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
|}) => void;

export type OnTapType = ({|
  event:
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  dangerouslyDisableOnNavigation: () => void,
|}) => void;

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
  role?: 'button' | 'link' | 'switch',
  rounding?: Rounding,
  tabIndex?: -1 | 0,
  tapStyle?: 'none' | 'compress',
|};

type TapAreaType = {|
  ...BaseTapArea,
  accessibilityChecked?: boolean,
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  role?: 'button' | 'switch',
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
 * [TapArea](https://gestalt.pinterest.systems/tapArea) allows components to be clickable and touchable in an accessible way
 *
 * ![TapArea](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/TapArea.svg)
 *
 */
const TapAreaWithForwardRef: AbstractComponent<unionProps, unionRefs> = forwardRef<
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

  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');

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

    const ariaLabel = getAriaLabel({ target, accessibilityLabel, accessibilityNewTabLabel });

    return (
      <InternalLink
        accessibilityCurrent={accessibilityCurrent}
        accessibilityLabel={ariaLabel}
        disabled={disabled}
        href={href}
        fullHeight={fullHeight}
        fullWidth={fullWidth}
        mouseCursor={mouseCursor}
        onClick={handleLinkClick}
        onBlur={handleLinkOnBlur}
        onFocus={handleLinkOnFocus}
        onKeyDown={handleLinkOnKeyDown}
        onMouseDown={onMouseDown}
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
        <NewTabAccessibilityLabel target={target} />
      </InternalLink>
    );
  }

  const {
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityChecked,
    role,
  } = props;
  return (
    <div
      aria-checked={role === 'switch' ? accessibilityChecked : undefined}
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
      role={role ?? 'button'}
      {...(tapStyle === 'compress' && compressStyle && !disabled ? { style: compressStyle } : {})}
      tabIndex={disabled ? null : tabIndex}
    >
      {children}
    </div>
  );
});

TapAreaWithForwardRef.displayName = 'TapArea';

export default TapAreaWithForwardRef;
