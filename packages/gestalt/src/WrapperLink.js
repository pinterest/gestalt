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
import touchableStyles from './Touchable.css';
import useFocusVisible from './useFocusVisible.js';
import getRoundingClassName from './getRoundingClassName.js';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type Props = {|
  accessibilityLabel?: string,
  children?: Node,
  colorClass?: string,
  disabled?: boolean,
  href: string,
  id?: string,
  inline?: boolean,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
  >,
  rel?: 'none' | 'nofollow',
  size?: 'sm' | 'md' | 'lg',
  target?: null | 'self' | 'blank',
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
    href,
    id,
    inline,
    onClick,
    rel,
    size,
    target,
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

  const className = classnames(
    linkStyles.link,
    linkStyles.buttonLink,
    buttonStyles.button,
    focusStyles.hideOutline,
    touchableStyles.tapTransition,
    inline ? linkStyles.inlineBlock : linkStyles.block,
    getRoundingClassName('pill'),
    {
      [buttonStyles.sm]: size === 'sm',
      [buttonStyles.md]: size === 'md',
      [buttonStyles.lg]: size === 'lg',
      [buttonStyles.disabled]: disabled,
      [touchableStyles.tapCompress]: !disabled && isTapping,
      [focusStyles.accessibilityOutline]: isFocusVisible,
    },
    colorClass
      ? {
          [buttonStyles[colorClass]]: !disabled,
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
  href: PropTypes.string.isRequired,
  id: PropTypes.string,
  inline: PropTypes.bool,
  onClick: PropTypes.func,
  rel: (PropTypes.oneOf(['none', 'nofollow']): React$PropType$Primitive<
    'none' | 'nofollow'
  >),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  target: (PropTypes.oneOf([null, 'self', 'blank']): React$PropType$Primitive<
    null | 'self' | 'blank'
  >),
};

WrapperLinkWithForwardRef.displayName = 'ButtonLink';

export default WrapperLinkWithForwardRef;
