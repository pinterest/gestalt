// @flow strict

import {
  createContext,
  type Context,
  type Element,
  type Node,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import useReducedMotion from '../useReducedMotion.js';

/* A backward-compatible shim for React < 18
 * flushSync is needed in React 18+ to ensure that the animation is finished before the onDismiss callback is called.
 */
function flushSync(callback) {
  if (ReactDOM.flushSync) {
    ReactDOM.flushSync(callback);
  } else {
    callback();
  }
}

export type AnimationStateType = null | 'opening' | 'closing' | 'unmount';

type AnimationType = {|
  animationState: AnimationStateType,
  setAnimationState: ((AnimationStateType) => void) | null,
|};

type UseAnimationType = {|
  animationState: AnimationStateType,
  handleAnimation: (() => void) | null,
  onAnimatedDismiss: () => void,
|};

type AnimationProviderProps = {|
  children: Node,
  onDismiss: () => void,
|};

const initialState = {
  // null equals to 'noMotionMount'. null here is used to mount OverlayPanel with reduced motion, no animation.
  animationState: null,
  setAnimationState: null,
};

// Animation context
const AnimationContext: Context<AnimationType> = createContext<AnimationType>(initialState);

// Animation context provider
export default function AnimationProvider({
  children,
  onDismiss,
}: AnimationProviderProps): Element<typeof AnimationContext.Provider> | null {
  // Accessibility check for motion sensitivity
  const reducedMotion = useReducedMotion();

  const [animationState, setAnimationState] = useState<AnimationStateType>(
    //  null equals to 'noMotionMount'. null here is used to mount OverlayPanel with reduced motion, no animation.
    reducedMotion ? null : 'opening',
  );

  // we manage 'unmount'
  useEffect(() => {
    if (animationState === 'unmount') {
      onDismiss();
    }
  }, [animationState, onDismiss]);

  const contextValue = useMemo(() => ({ animationState, setAnimationState }), [animationState]);

  // gated null return, must be located after all hooks. we unmount the component here
  if (animationState === 'unmount') {
    return null;
  }

  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>;
}
// Animation context hook
export function useAnimation(): UseAnimationType {
  const reducedMotion = useReducedMotion();

  const { animationState, setAnimationState } = useContext(AnimationContext);

  // onAnimatedDismiss is ultimately the callback that triggers unmounting with/without animation. It can be accessed via render props in the API (onDismissStart)
  const onAnimatedDismiss = useCallback(() => {
    if (setAnimationState)
      flushSync(() => setAnimationState?.(reducedMotion ? 'unmount' : 'closing'));
  }, [setAnimationState, reducedMotion]);

  const handleAnimation = useCallback(() => {
    if (['opening', 'closing'].includes(animationState) && setAnimationState)
      //  null equals to 'motionMount'. null here is used to used to mount OverlayPanel with motion.
      flushSync(() => setAnimationState(animationState === 'opening' ? null : 'unmount'));
  }, [animationState, setAnimationState]);

  return {
    animationState,
    onAnimatedDismiss,
    handleAnimation: reducedMotion ? null : handleAnimation,
  };
}
