// @flow strict
import * as React from 'react';
import classnames from 'classnames';
import touchableStyles from './Touchable.css';
import styles from './Link.css';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import getRoundingClassName, { type Rounding } from './getRoundingClassName.js';

type TapEvent =
  | SyntheticMouseEvent<HTMLAnchorElement>
  | SyntheticKeyboardEvent<HTMLAnchorElement>;

type Props = {|
  accessibilitySelected?: boolean,
  children?: React.Node,
  hoverStyle?: 'none' | 'underline',
  href: string,
  id?: string,
  inline?: boolean,
  onBlur?: ({| +event: SyntheticFocusEvent<> |}) => void,
  onClick?: ({| event: TapEvent |}) => void,
  onFocus?: ({| +event: SyntheticFocusEvent<> |}) => void,
  rel?: 'none' | 'nofollow',
  role?: 'tab',
  rounding?: Rounding,
  tapStyle?: 'none' | 'compress',
  target?: null | 'self' | 'blank',
|};

export default function Link({
  accessibilitySelected,
  children,
  href,
  id,
  inline = false,
  onBlur,
  onClick,
  onFocus,
  rel = 'none',
  role,
  rounding = 0,
  hoverStyle = 'underline',
  tapStyle = 'none',
  target = null,
}: Props): React.Node {
  const {
    isTapping,
    handleBlur,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchCancel,
    handleTouchEnd,
  } = useTapFeedback();

  const className = classnames(
    styles.link,
    touchableStyles.touchable,
    inline ? styles.inlineBlock : styles.block,
    getRoundingClassName(rounding),
    {
      [styles.hoverUnderline]: hoverStyle === 'underline',
      [touchableStyles.tapCompress]: tapStyle === 'compress' && isTapping,
    }
  );

  return (
    <a
      aria-selected={accessibilitySelected}
      className={className}
      href={href}
      id={id}
      onBlur={event => {
        handleBlur();
        if (onBlur) {
          onBlur({ event });
        }
      }}
      onClick={event => {
        if (onClick) {
          onClick({ event });
        }
      }}
      onFocus={event => {
        if (onFocus) {
          onFocus({ event });
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
      rel={[
        ...(target === 'blank' ? ['noopener', 'noreferrer'] : []),
        ...(rel === 'nofollow' ? ['nofollow'] : []),
      ].join(' ')}
      role={role}
      target={target ? `_${target}` : null}
    >
      {children}
    </a>
  );
}
