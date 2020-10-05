// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Backdrop.css';
import { type AnimationStateType } from './AnimationController.js';

type Props = {|
  animationState?: AnimationStateType,
  children?: Node,
  closeOnOutsideClick: boolean,
  onClick?: (event: MouseEvent) => void,
|};

function Backdrop({
  animationState,
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

  return (
    <>
      {/* Disabling the linters below is fine, we don't want key event listeners (ESC handled elsewhere) */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={classnames(styles.backdrop, {
          [styles.backdropAnimationIn]: animationState === 'in',
          [styles.backdropAnimationOut]: animationState === 'out',
          [styles.zoomOut]: closeOnOutsideClick,
        })}
        onClick={handleClick}
      />
      {children}
    </>
  );
}

Backdrop.propTypes = {
  animationState: PropTypes.string,
  children: PropTypes.node,
  closeOnOutsideClick: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Backdrop;
