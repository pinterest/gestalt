// @flow
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

type State = {|
  enableFocusStyles: boolean,
|};

const TAB_KEY_CODE = 9;

export default class Link extends React.Component<Props, State> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    inline: PropTypes.bool,
    onClick: PropTypes.func,
    target: PropTypes.oneOf([null, 'self', 'blank']),
  };

  state: State = {
    enableFocusStyles: true,
  };

  handleClick = (event: SyntheticMouseEvent<>) => {
    const { href, onClick } = this.props;
    if (onClick && href) {
      onClick({ event });
    }
  };

  handleMouseDown = () => {
    const { href, target } = this.props;
    if (target === 'blank' && href) {
      this.setState({ enableFocusStyles: false });
    }
  };

  handleKeyUp = (event: SyntheticKeyboardEvent<>) => {
    const { href, target } = this.props;
    if (target === 'blank' && event.keyCode === TAB_KEY_CODE && href) {
      this.setState({ enableFocusStyles: true });
    }
  };

  render() {
    const { children, inline = false, target = null, href } = this.props;
    const rel = target === 'blank' ? 'noopener noreferrer' : null;
    const linkTarget = target ? `_${target}` : null;

    return (
      <a
        className={cx(
          styles.link,
          this.state.enableFocusStyles ? styles.accessibleFocusStyle : '',
          inline ? '' : styles.block
        )}
        href={href}
        onMouseDown={this.handleMouseDown}
        onKeyUp={this.handleKeyUp}
        onClick={this.handleClick}
        rel={rel}
        target={linkTarget}
      >
        {children}
      </a>
    );
  }
}
