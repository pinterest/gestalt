// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Link.css';

type Props = {|
  children?: React.Node,
  href: string,
  inline?: boolean,
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  target?: null | 'self' | 'blank',
|};

const TAB_KEY_CODE = 9;

export default function Link({
  children,
  href,
  inline = false,
  onClick,
  target = null,
}: Props) {
  const [enableFocusStyles, setEnableFocusStyles] = React.useState(true);
  const rel = target === 'blank' ? 'noopener noreferrer' : null;
  const linkTarget = target ? `_${target}` : null;

  const handleClick = (event: SyntheticMouseEvent<>) => {
    if (onClick && href) {
      onClick({ event });
    }
  };

  const handleMouseDown = () => {
    if (target === 'blank' && href) {
      setEnableFocusStyles(false);
    }
  };

  const handleKeyUp = (event: SyntheticKeyboardEvent<>) => {
    if (target === 'blank' && event.keyCode === TAB_KEY_CODE && href) {
      setEnableFocusStyles(true);
    }
  };

  return (
    <a
      className={cx(
        styles.link,
        enableFocusStyles ? styles.accessibleFocusStyle : '',
        inline ? '' : styles.block
      )}
      href={href}
      onMouseDown={handleMouseDown}
      onKeyUp={handleKeyUp}
      onClick={handleClick}
      rel={rel}
      target={linkTarget}
    >
      {children}
    </a>
  );
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  onClick: PropTypes.func,
  target: PropTypes.oneOf([null, 'self', 'blank']),
};
