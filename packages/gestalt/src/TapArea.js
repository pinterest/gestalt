// @flow strict
import { forwardRef, type Node, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Touchable.css';
import InternalLink from './InternalLink.js';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import getRoundingClassName, { RoundingPropType, type Rounding } from './getRoundingClassName.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';

type FocusEventHandler = AbstractEventHandler<
  SyntheticFocusEvent<HTMLDivElement> | SyntheticFocusEvent<HTMLAnchorElement>,
>;

type MouseEventHandler = AbstractEventHandler<
  SyntheticMouseEvent<HTMLDivElement> | SyntheticMouseEvent<HTMLAnchorElement>,
>;

export type OnTapType = AbstractEventHandler<
  | SyntheticMouseEvent<HTMLDivElement>
  | SyntheticKeyboardEvent<HTMLDivElement>
  | SyntheticMouseEvent<HTMLAnchorElement>
  | SyntheticKeyboardEvent<HTMLAnchorElement>,
  {| disableOnNavigation: () => void |},
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
  accessibilityCurrent?: boolean,
  href: string,
  rel?: 'none' | 'nofollow',
  role: 'link',
  target?: null | 'self' | 'blank',
|};

type unionProps = TapAreaType | LinkTapAreaType;
type unionRefs = HTMLDivElement | HTMLAnchorElement;

/**
 * https://gestalt.pinterest.systems/TapArea
 */
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
      event.preventDefault();
      onTap({ event, disableOnNavigation: () => {} });
    }
  };

  const handleClick = (event, disableOnNavigation) =>
    !disabled && onTap
      ? onTap({ event, disableOnNavigation: disableOnNavigation ?? (() => {}) })
      : undefined;

  const handleLinkClick = ({ event, disableOnNavigation }) =>
    handleClick(event, disableOnNavigation);

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

TapAreaWithForwardRef.propTypes = {
  accessibilityControls: PropTypes.string,
  accessibilityCurrent: PropTypes.bool,
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
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onTap: PropTypes.func,
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
