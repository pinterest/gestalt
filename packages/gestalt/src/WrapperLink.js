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
import iconButtonStyles from './IconButton.css';
import focusStyles from './Focus.css';
import linkStyles from './Link.css';
import touchableStyles from './Touchable.css';
import useFocusVisible from './useFocusVisible.js';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import getRoundingClassName, {
  RoundingPropType,
  type Rounding,
} from './getRoundingClassName.js';

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
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
  >,
  rel?: 'none' | 'nofollow',
  rounding?: Rounding,
  size?: 'sm' | 'md' | 'lg',
  target?: null | 'self' | 'blank',
  wrappedComponent: 'button' | 'iconButton' | 'tapArea',
|};

const WrapperLinkWithForwardRef: AbstractComponent<
  Props,
  HTMLAnchorElement
> = forwardRef<Props, HTMLAnchorElement>(function Link(
  props,
  ref
): Element<'a'> {
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
    onClick,
    rel,
    rounding,
    size,
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
    inline || isTapArea ? linkStyles.inlineBlock : linkStyles.block,
    getRoundingClassName(isTapArea ? rounding || 0 : 'pill'),
    {
      [buttonStyles.disabled]: !isTapArea && disabled,
      [touchableStyles.tapCompress]: !disabled && isTapping,
      [focusStyles.accessibilityOutline]: isFocusVisible,
    },
    isButton
      ? {
          [linkStyles.buttonLink]: true,
          [buttonStyles.button]: true,
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
    isIconButton
      ? {
          [iconButtonStyles.button]: true,
          [iconButtonStyles.disabled]: disabled,
          [iconButtonStyles.enabled]: !disabled,
        }
      : {},
    isTapArea
      ? {
          [touchableStyles.fullHeight]: fullHeight,
          [touchableStyles.fullWidth]: fullWidth,
        }
      : {}
  );

  return (
    <a
      aria-label={accessibilityLabel}
      className={className}
      href={disabled ? undefined : href}
      id={id}
      onBlur={handleBlur}
      onClick={event => {
        if (onClick) {
          onClick({ event });
        }
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyPress={event => {
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
      {...(compressStyle && !disabled ? { style: compressStyle } : {})}
      target={target ? `_${target}` : null}
    >
      {children}
    </a>
  );
});

// $FlowFixMe Flow(InferError)
WrapperLinkWithForwardRef.propTypes = {
  accessibilityLabel: PropTypes.string,
  children: PropTypes.node,
  colorClass: PropTypes.string,
  disabled: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  href: PropTypes.string.isRequired,
  id: PropTypes.string,
  inline: PropTypes.bool,
  onClick: PropTypes.func,
  rel: (PropTypes.oneOf(['none', 'nofollow']): React$PropType$Primitive<
    'none' | 'nofollow'
  >),
  rounding: RoundingPropType,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  target: (PropTypes.oneOf([null, 'self', 'blank']): React$PropType$Primitive<
    null | 'self' | 'blank'
  >),
  wrappedComponent: PropTypes.oneOf(['button', 'iconButton', 'tapArea']),
};

WrapperLinkWithForwardRef.displayName = 'ButtonLink';

export default WrapperLinkWithForwardRef;
