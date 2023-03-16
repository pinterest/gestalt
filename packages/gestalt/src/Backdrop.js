// @flow strict
import { Fragment, type Node } from 'react';
import classnames from 'classnames';
import styles from './Backdrop.css';
import { useAnimation } from './OverlayPanel/AnimationContext.js';

type Props = {|
  children?: Node,
  closeOnOutsideClick: boolean,
  onClick?: (event: MouseEvent) => void,
|};

function Backdrop({ children, closeOnOutsideClick, onClick }: Props): Node {
  const { animationState } = useAnimation();

  const handleClick = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Fragment>
      {/* Disabling the linters below is fine, we don't want key event listeners (ESC handled elsewhere) */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={classnames(styles.backdrop, {
          [styles.backdropAnimationIn]: animationState === 'opening',
          [styles.backdropAnimationOut]: animationState === 'closing',
          [styles.zoomOut]: closeOnOutsideClick,
        })}
        onClick={handleClick}
      />
      {children}
    </Fragment>
  );
}

export default Backdrop;
