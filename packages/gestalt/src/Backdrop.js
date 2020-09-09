// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Backdrop.css';

type Props = {|
  animation?: string,
  children?: Node,
  closeOnOutsideClick: boolean,
  onClick?: (event: MouseEvent) => void,
|};

function Backdrop({
  animation,
  children,
  closeOnOutsideClick,
  onClick,
}: Props): Node {
  const handleClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  /*
  Animation example: "animation: g-backdrop-fade-in 400ms ease-in-out"

  Currently supported backdrop animations:  
  - g-backdrop-fade-in: fades the backdrop in
  - g-backdrop-fade-out: fades the backdrop out
  */
  const style = animation ? { animation } : {};
  return (
    <>
      {/* Disabling the linters below is fine, we don't want key event listeners (ESC handled elsewhere) */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={classnames(styles.backdrop, {
          [styles.zoomOut]: closeOnOutsideClick,
        })}
        onClick={handleClick}
        style={style}
      />
      {children}
    </>
  );
}

Backdrop.propTypes = {
  animation: PropTypes.string,
  children: PropTypes.node,
  closeOnOutsideClick: PropTypes.bool,
  onClick: PropTypes.func,
};
Backdrop.displayName = 'Backdrop';

export default Backdrop;
