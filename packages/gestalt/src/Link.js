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
  children?: React.Node,
  hoverStyle?: 'none' | 'underline',
  href: string,
  inline?: boolean,
  onClick?: ({ event: TapEvent }) => void,
  rel?: 'none' | 'nofollow',
  rounding?: Rounding,
  tapStyle?: 'none' | 'compress',
  target?: null | 'self' | 'blank',
|};

function Link({
  children,
  href,
  inline = false,
  onClick,
  rel = 'none',
  rounding = 0,
  hoverStyle = 'underline',
  tapStyle = 'none',
  target = null,
}: Props) {
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
      className={className}
      href={href}
      onContextMenu={event => event.preventDefault()}
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
      target={target ? `_${target}` : null}
    >
      {children}
    </a>
  );
}

const LinkPropTypes = {
  children: PropTypes.node,
  hoverStyle: PropTypes.oneOf(['none', 'underline']),
  href: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  onClick: PropTypes.func,
  rel: PropTypes.oneOf(['none', 'nofollow']),
  rounding: RoundingPropType,
  tapStyle: PropTypes.oneOf(['none', 'compress']),
  target: PropTypes.oneOf([null, 'self', 'blank']),
};

Link.propTypes = LinkPropTypes;

export default Link;
