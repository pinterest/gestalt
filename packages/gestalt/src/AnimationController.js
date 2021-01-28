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
      <>
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
      </>
    );
  };

  const [shouldShow, setShouldShow] = React.useState(false);

  return (
    <>
      <Button
        inline
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
    </>
  );
}`}

*/
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
      setAnimationState(animationState === 'in' ? 'postIn' : 'postOut');
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
  const onDismissStart = useCallback(() => setAnimationState(shouldAnimate ? 'out' : 'postOut'), [
    setAnimationState,
    shouldAnimate,
  ]);

  useEffect(() => {
    if (animationState === 'postOut') {
      onDismissEnd();
    }
  }, [animationState, onDismissEnd]);

  if (animationState === 'postOut') {
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
