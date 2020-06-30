// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import touchableStyles from './Touchable.css';
import styles from './Link.css';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import getRoundingClassName, {
  RoundingPropType,
  type Rounding,
} from './getRoundingClassName.js';

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
  onClick?: ({| event: TapEvent |}) => void,
  rel?: 'none' | 'nofollow',
  role?: 'tab',
  rounding?: Rounding,
  tapStyle?: 'none' | 'compress',
  target?: null | 'self' | 'blank',
|};

function Link({
  accessibilitySelected,
  children,
  href,
  id,
  inline = false,
  onClick,
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
      [styles.tab]: role === 'tab',
    }
  );

  return (
    <a
      aria-selected={accessibilitySelected}
      className={className}
      href={href}
      id={id}
      onClick={event => {
        if (onClick) {
          onClick({ event });
        }
      }}
      onBlur={handleBlur}
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

const LinkPropTypes = {
  accessibilitySelected: PropTypes.bool,
  children: PropTypes.node,
  hoverStyle: (PropTypes.oneOf(['none', 'underline']): React$PropType$Primitive<
    'none' | 'underline'
  >),
  href: PropTypes.string.isRequired,
  id: PropTypes.string,
  inline: PropTypes.bool,
  onClick: PropTypes.func,
  rel: (PropTypes.oneOf(['none', 'nofollow']): React$PropType$Primitive<
    'none' | 'nofollow'
  >),
  role: (PropTypes.oneOf(['tab']): React$PropType$Primitive<'tab'>),
  rounding: RoundingPropType,
  tapStyle: (PropTypes.oneOf(['none', 'compress']): React$PropType$Primitive<
    'none' | 'compress'
  >),
  target: (PropTypes.oneOf([null, 'self', 'blank']): React$PropType$Primitive<
    null | 'self' | 'blank'
  >),
};

Link.propTypes = LinkPropTypes;

export default Link;
