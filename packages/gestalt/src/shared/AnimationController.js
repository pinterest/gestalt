// @flow strict
/*

# Welcome to AnimationController!

An <AnimationController> is a wrapper to control animation of its wrapped components.
It works with a Context.Provider which holds the state for animationState.
Finally, it provides the custom hook useAnimation which provides an object { animationState, onAnimationEnd } where:
- animationState: the current animation state. Possible values are: null, "in", "postIn", "out", "postOut".
- onAnimationEnd: the callback function to be passed to onAnimationEnd event handlers on the element that is being animated.

PS: This animation is controlled by useReducedMotion.

Example:

function AnimationExample() {
  const AnimatedComponent = ({
    onDismissStart,
  }) => {
    const { animationState, onAnimationEnd } = useAnimation();

    let className;
    if (['in', 'out'].includes(animationState)) {
        className = 'slide-' + animationState;
    }

    return (
      <React.Fragment>
        <style>{\`
          @keyframes slide-in {
            from {
              margin-left: 100%;
              width: 300%;
            }

            to {
              margin-left: 0%;
              width: 100%;
            }
          }

          @keyframes slide-out {
            from {
              margin-left: 0%;
              width: 100%;
            }

            to {
              margin-left: 100%;
              width: 300%;
            }
          }

          .slide-in {
            animation: slide-in 1s ease-in-out;
          }

          .slide-out {
            animation: slide-out 1s ease-in-out;
          }
        \`}</style>
        <Box marginTop={4} marginBottom={4}>
          <Text>Animation state: <b>{animationState}</b></Text>
        </Box>
        <div onAnimationEnd={onAnimationEnd} className={className}>
          <Button color="red" inline onClick={onDismissStart} text="Click me!" />
        </div>
      </React.Fragment>
    );
  };

  const [shouldShow, setShouldShow] = React.useState(false);

  return (
    <React.Fragment>
      <Button
        text="Show animation"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <AnimationController onDismissEnd={() => setShouldShow(false)}>
          {({ onDismissStart }) => (
            <AnimatedComponent onDismissStart={onDismissStart} />
          )}
        </AnimationController>
      )}
    </React.Fragment>
  );
}`}

*/
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
import useReducedMotion from '../hooks/useReducedMotion.js';

/* A backward-compatible shim for React < 18 */
function flushSync(callback) {
  if (ReactDOM.flushSync) {
    ReactDOM.flushSync(callback);
  } else {
    callback();
  }
}

export type AnimationStateType = 'in' | 'postIn' | 'out' | 'postOut' | null;

type AnimationType = {|
  animationState: AnimationStateType,
  setAnimationState: ((AnimationStateType) => void) | null,
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

const AnimationContext: Context<AnimationType> = createContext<AnimationType>(initialState);

export function useAnimation(): UseAnimationType {
  const { animationState, setAnimationState } = useContext(AnimationContext);
  const onAnimationEnd = useCallback(() => {
    if (['in', 'out'].includes(animationState) && setAnimationState) {
      // flushSync is needed in React 18+ to ensure that the animation is finished before the onDismissEnd callback is called.
      flushSync(() => setAnimationState(animationState === 'in' ? 'postIn' : 'postOut'));
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
    shouldAnimate ? 'in' : null,
  );
  const onDismissStart = useCallback(() => {
    flushSync(() => setAnimationState(shouldAnimate ? 'out' : 'postOut'));
  }, [setAnimationState, shouldAnimate]);

  useEffect(() => {
    if (animationState === 'postOut') {
      onDismissEnd();
    }
  }, [animationState, onDismissEnd]);

  const contextValue = useMemo(() => ({ animationState, setAnimationState }), [animationState]);

  if (animationState === 'postOut') {
    return null;
  }

  return (
    <AnimationContext.Provider value={contextValue}>
      {children({ onDismissStart })}
    </AnimationContext.Provider>
  );
}

export default AnimationController;
