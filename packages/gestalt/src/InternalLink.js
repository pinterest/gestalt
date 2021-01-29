// @flow strict
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  type AbstractComponent,
  type Node,
  type Element,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import buttonStyles from './Button.css';
import focusStyles from './Focus.css';
import linkStyles from './Link.css';
import iconButtonStyles from './IconButton.css';
import touchableStyles from './Touchable.css';
import useFocusVisible from './useFocusVisible.js';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import getRoundingClassName, { RoundingPropType, type Rounding } from './getRoundingClassName.js';

type Props = {|
  accessibilityLabel?: string,
  children?: Node,
  colorClass?: string,
  disabled?: boolean,
  fullHeight?: boolean,
  fullWidth?: boolean,
  href: string,
  id?: string,
  inline?: boolean,
  mouseCursor?: 'copy' | 'grab' | 'grabbing' | 'move' | 'noDrop' | 'pointer' | 'zoomIn' | 'zoomOut',
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
  >,
  onBlur?: AbstractEventHandler<SyntheticFocusEvent<HTMLAnchorElement>>,
  onFocus?: AbstractEventHandler<SyntheticFocusEvent<HTMLAnchorElement>>,
  onMouseEnter?: AbstractEventHandler<SyntheticMouseEvent<HTMLAnchorElement>>,
  onMouseDown?: AbstractEventHandler<SyntheticMouseEvent<HTMLAnchorElement>>,
  onMouseUp?: AbstractEventHandler<SyntheticMouseEvent<HTMLAnchorElement>>,
  onMouseLeave?: AbstractEventHandler<SyntheticMouseEvent<HTMLAnchorElement>>,
  rel?: 'none' | 'nofollow',
  tabIndex: -1 | 0,
  rounding?: Rounding,
  size?: 'sm' | 'md' | 'lg',
  tapStyle?: 'none' | 'compress',
  target?: null | 'self' | 'blank',
  wrappedComponent: 'button' | 'iconButton' | 'tapArea',
|};

const InternalLinkWithForwardRef: AbstractComponent<Props, HTMLAnchorElement> = forwardRef<
  Props,
  HTMLAnchorElement,
>(function Link(props, ref): Element<'a'> {
  const {
    accessibilityLabel,
    children,
    colorClass,
    disabled,
    fullHeight,
    fullWidth,
    href,
    id,
    inline,
    mouseCursor,
    onClick,
    onBlur,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    rel,
    tabIndex = 0,
    rounding,
    size,
    tapStyle = 'compress',
    target,
    wrappedComponent,
  } = props;

  const innerRef = useRef(null);

  useImperativeHandle(ref, () => innerRef.current);

  const {
    compressStyle,
    handleBlur,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchCancel,
    handleTouchEnd,
    isTapping,
  } = useTapFeedback({
    height: innerRef?.current?.clientHeight,
    width: innerRef?.current?.clientWidth,
  });

  const { isFocusVisible } = useFocusVisible();
  const isTapArea = wrappedComponent === 'tapArea';
  const isButton = wrappedComponent === 'button';
  const isIconButton = wrappedComponent === 'iconButton';

  const className = classnames(
    linkStyles.link,
    focusStyles.hideOutline,
    touchableStyles.tapTransition,
    inline ? linkStyles.inlineBlock : linkStyles.block,
    getRoundingClassName(isTapArea ? rounding || 0 : 'pill'),
    {
      [touchableStyles.tapCompress]: !disabled && tapStyle === 'compress' && isTapping,
      [focusStyles.accessibilityOutline]: !disabled && isFocusVisible,
    },
    isButton
      ? {
          [linkStyles.buttonLink]: true,
          [buttonStyles.button]: true,
          [buttonStyles.disabled]: disabled,
          [buttonStyles.sm]: size === 'sm',
          [buttonStyles.md]: size === 'md',
          [buttonStyles.lg]: size === 'lg',
        }
      : {},
    isButton && colorClass
      ? {
          [buttonStyles[colorClass]]: !disabled,
        }
      : {},
    isTapArea
      ? {
          [touchableStyles.fullHeight]: fullHeight,
          [touchableStyles.fullWidth]: fullWidth,
        }
      : {},
    isTapArea && mouseCursor
      ? {
          [touchableStyles[mouseCursor]]: !disabled,
        }
      : {},
    isIconButton
      ? {
          [iconButtonStyles.button]: true,
          [iconButtonStyles.disabled]: disabled,
          [iconButtonStyles.enabled]: !disabled,
        }
      : {},
  );

  return (
    <a
      aria-label={accessibilityLabel}
      className={className}
      href={disabled ? undefined : href}
      id={id}
      onContextMenu={isTapArea ? (event) => event.preventDefault() : null}
      onBlur={(event) => {
        if (onBlur) {
          onBlur({ event });
        }
        handleBlur();
      }}
      onClick={(event) => {
        if (onClick) {
          onClick({ event });
        }
      }}
      onFocus={(event) => {
        if (onFocus) {
          onFocus({ event });
        }
      }}
      onMouseEnter={(event) => {
        if (onMouseEnter) {
          onMouseEnter({ event });
        }
      }}
      onMouseLeave={(event) => {
        if (onMouseLeave) {
          onMouseLeave({ event });
        }
      }}
      onMouseDown={(event) => {
        if (onMouseDown) {
          onMouseDown({ event });
        }
        handleMouseDown();
      }}
      onMouseUp={(event) => {
        if (onMouseUp) {
          onMouseUp({ event });
        }
        handleMouseUp();
      }}
      onKeyPress={(event) => {
        // Check to see if space or enter were pressed
        if (onClick && keyPressShouldTriggerTap(event)) {
          // Prevent the default action to stop scrolling when space is pressed
          event.preventDefault();
          onClick({ event });
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      ref={innerRef}
      rel={[
        ...(target === 'blank' ? ['noopener', 'noreferrer'] : []),
        ...(rel === 'nofollow' ? ['nofollow'] : []),
      ].join(' ')}
      tabIndex={disabled ? null : tabIndex}
      {...(tapStyle === 'compress' && compressStyle && !disabled ? { style: compressStyle } : {})}
      target={target ? `_${target}` : null}
    >
      {children}
    </a>
  );
});

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
InternalLinkWithForwardRef.propTypes = {
  accessibilityLabel: PropTypes.string,
  children: PropTypes.node,
  colorClass: PropTypes.string,
  disabled: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  href: PropTypes.string.isRequired,
  id: PropTypes.string,
  inline: PropTypes.bool,
  mouseCursor: PropTypes.oneOf([
    'copy',
    'grab',
    'grabbing',
    'move',
    'noDrop',
    'pointer',
    'zoomIn',
    'zoomOut',
  ]),
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  rel: (PropTypes.oneOf(['none', 'nofollow']): React$PropType$Primitive<'none' | 'nofollow'>),
  tabIndex: PropTypes.oneOf([-1, 0]),
  rounding: RoundingPropType,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  tapStyle: (PropTypes.oneOf(['none', 'compress']): React$PropType$Primitive<'none' | 'compress'>),
  target: (PropTypes.oneOf([null, 'self', 'blank']): React$PropType$Primitive<
    null | 'self' | 'blank',
  >),
  wrappedComponent: PropTypes.oneOf(['button', 'iconButton', 'tapArea']),
};

InternalLinkWithForwardRef.displayName = 'ButtonLink';

export default InternalLinkWithForwardRef;
