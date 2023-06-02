// @flow strict
import { Fragment, type Node } from 'react';
import classnames from 'classnames';
import styles from './Backdrop.css';
import { useAnimation, ANIMATION_STATE } from './animation/AnimationContext.js';

type Props = {|
  children?: Node,
  closeOnOutsideClick: boolean,
  onClick?: (event: SyntheticMouseEvent<HTMLDivElement>) => void,
|};

function Backdrop({ children, closeOnOutsideClick, onClick }: Props): Node {
  const { animationState } = useAnimation();

  return (
    <Fragment>
      {/* Disabling the linters below is fine, we don't want key event listeners (ESC handled elsewhere) */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={classnames(styles.backdrop, {
          [styles.initialize]: animationState === ANIMATION_STATE.hidden,
          [styles.backdropAnimationIn]: animationState === ANIMATION_STATE.animatedOpening,
          [styles.backdropAnimationOut]: animationState === ANIMATION_STATE.animatedClosing,
          [styles.zoomOut]: closeOnOutsideClick,
        })}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          onClick?.(event);
        }}
      />
      {children}
    </Fragment>
  );
}

export default Backdrop;
