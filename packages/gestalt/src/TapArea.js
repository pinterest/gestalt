// @flow strict
import React, { forwardRef, useImperativeHandle, useRef, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Touchable.css';
import InternalLink from './InternalLink.js';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import getRoundingClassName, { RoundingPropType, type Rounding } from './getRoundingClassName.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';
import { type onNavigationOptionsType } from './contexts/OnNavigation.js';

type FocusEventHandler = AbstractEventHandler<
  SyntheticFocusEvent<HTMLDivElement> | SyntheticFocusEvent<HTMLAnchorElement>,
>;

type MouseEventHandler = AbstractEventHandler<
  SyntheticMouseEvent<HTMLDivElement> | SyntheticMouseEvent<HTMLAnchorElement>,
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
  onMouseEnter?: MouseEventHandler,
  onMouseLeave?: MouseEventHandler,
  onTap?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  >,
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
  href: string,
  onNavigationOptions?: onNavigationOptionsType,
  rel?: 'none' | 'nofollow',
  role: 'link',
  target?: null | 'self' | 'blank',
|};

type unionProps = TapAreaType | LinkTapAreaType;
type unionRefs = HTMLDivElement | HTMLAnchorElement;

const TapAreaWithForwardRef: React$AbstractComponent<unionProps, unionRefs> = forwardRef<
  unionProps,
  unionRefs,
>(function TapArea(props, ref): Node {
  const {
    accessibilityLabel,
    children,
    disabled = false,
    fullHeight,
    fullWidth = true,
    mouseCursor = 'pointer',
    onBlur,
    onFocus,
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

  const handleClick = (event) => {
    if (!disabled && onTap) {
      onTap({ event });
    }
  };

  const handleLinkClick = ({ event }) => handleClick(event);

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
    const { href, onNavigationOptions, rel = 'none', target = null } = props;

    return (
      <InternalLink
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        href={href}
        fullHeight={fullHeight}
        fullWidth={fullWidth}
        mouseCursor={mouseCursor}
        onClick={handleLinkClick}
        onNavigationOptions={onNavigationOptions}
        onBlur={handleLinkOnBlur}
        onFocus={handleLinkOnFocus}
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
      onContextMenu={(event) => event.preventDefault()}
      onClick={handleClick}
      onBlur={(event) => {
        handleOnBlur(event);
        handleBlur();
      }}
      onFocus={handleOnFocus}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyPress={(event) => {
        // Check to see if space or enter were pressed
        if (!disabled && onTap && keyPressShouldTriggerTap(event)) {
          // Prevent the default action to stop scrolling when space is pressed
          event.preventDefault();
          onTap({ event });
        }
      }}
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

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
TapAreaWithForwardRef.propTypes = {
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  mouseCursor: (PropTypes.oneOf([
    'copy',
    'grab',
    'grabbing',
    'move',
    'noDrop',
    'pointer',
    'zoomIn',
    'zoomOut',
  ]): React$PropType$Primitive<
    'copy' | 'grab' | 'grabbing' | 'move' | 'noDrop' | 'pointer' | 'zoomIn' | 'zoomOut',
  >),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onTap: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  onNavigationOptions: PropTypes.object,
  rel: (PropTypes.oneOf(['none', 'nofollow']): React$PropType$Primitive<'none' | 'nofollow'>),
  tabIndex: PropTypes.oneOf([-1, 0]),
  role: PropTypes.oneOf(['tapArea', 'link']),
  rounding: RoundingPropType,
  tapStyle: (PropTypes.oneOf(['none', 'compress']): React$PropType$Primitive<'none' | 'compress'>),
  target: (PropTypes.oneOf([null, 'self', 'blank']): React$PropType$Primitive<
    null | 'self' | 'blank',
  >),
};

TapAreaWithForwardRef.displayName = 'TapArea';

export default TapAreaWithForwardRef;
