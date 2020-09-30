// @flow strict
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type Context,
  type Element,
  type Node,
} from 'react';
import PropTypes from 'prop-types';
import useReducedMotion from './useReducedMotion.js';

export type AnimationStateType = 'in' | 'post-in' | 'out' | 'post-out' | null;

type AnimationType = {|
  animationState: AnimationStateType,
  setAnimationState: (AnimationStateType => void) | null,
|};

type UseAnimationType = {|
  animationState: AnimationStateType,
  onAnimationEnd: (() => void) | null,
|};

type AnimationControllerProps = {|
  children: ({| onDismissStart: () => void |}) => Node,
  onDismissEnd: () => void,
|};

const initialState = {
  animationState: null,
  setAnimationState: null,
};

const AnimationContext: Context<AnimationType> = createContext<AnimationType>(
  initialState
);

export function useAnimation(): UseAnimationType {
  const { animationState, setAnimationState } = useContext(AnimationContext);
  const onAnimationEnd = useCallback(() => {
    if (['in', 'out'].includes(animationState) && setAnimationState) {
      setAnimationState(animationState === 'in' ? 'post-in' : 'post-out');
    }
  }, [animationState, setAnimationState]);
  return {
    animationState,
    onAnimationEnd: animationState ? onAnimationEnd : null,
  };
}

function AnimationController({
  children,
  onDismissEnd,
}: AnimationControllerProps): Element<typeof AnimationContext.Provider> | null {
  const shouldAnimate = !useReducedMotion();
  const [animationState, setAnimationState] = useState<AnimationStateType>(
    shouldAnimate ? 'in' : null
  );
  const onDismissStart = useCallback(
    () => setAnimationState(shouldAnimate ? 'out' : 'post-out'),
    [setAnimationState, shouldAnimate]
  );

  useEffect(() => {
    if (animationState === 'post-out') {
      onDismissEnd();
    }
  }, [animationState, onDismissEnd]);

  if (animationState === 'post-out') {
    return null;
  }

  return (
    <AnimationContext.Provider value={{ animationState, setAnimationState }}>
      {children({ onDismissStart })}
    </AnimationContext.Provider>
  );
}

AnimationController.propTypes = {
  children: PropTypes.func.isRequired,
  onDismissEnd: PropTypes.func.isRequired,
};

export default AnimationController;
