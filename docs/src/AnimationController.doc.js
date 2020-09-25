// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="AnimationController"
    description={`An \`<AnimationController>\` is a wrapper to control animation of its wrapped components. 
    It works with a \`Context.Provider\` which holds the state for \`animationState\`. 
    Finally, it provides the custom hook \`useAnimation\` which provides an object \`{ animationState, onAnimationEnd }\` where:
    - \`animationState\`: the current animation state. Possible values are: \`null\`, \`"in"\`, \`"post-in"\`, \`"out"\`, \`"post-out"\`.
    - \`onAnimationEnd\`: the callback function to be passed to \`onAnimationEnd\` event handlers on the element that is being animated.
    PS: This animation is controlled by \`useReducedMotion\`.`}
  />
);

card(
  <Example
    id="animationExample"
    name="Example: animation states"
    description={`
    
  `}
    defaultCode={`
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
          @keyframes slide-in-ltr {
            from {
              margin-left: 100%;
              width: 300%; 
            }
          
            to {
              margin-left: 0%;
              width: 100%;
            }
          } 

          @keyframes slide-out-ltr {
            from {
              margin-left: 0%;
              width: 100%;
            }
            
            to {
              margin-left: 100%;
              width: 300%; 
            }
          } 

          @keyframes slide-in-rtl {
            from {
              margin-right: 100%;
              width: 300%; 
            }
          
            to {
              margin-right: 0%;
              width: 100%;
            }
          } 

          @keyframes slide-out-rtl {
            from {
              margin-right: 0%;
              width: 100%;
            }
            
            to {
              margin-right: 100%;
              width: 300%; 
            }
          } 

          .slide-in {
            animation: slide-in-ltr 1s ease-in-out;
          }
          
          html[dir="rtl"] .slide-in {
            animation: slide-in-rtl 1s ease-in-out;
          }
          
          .slide-out {
            animation: slide-out-ltr 1s ease-in-out;
          }
          
          html[dir="rtl"] .slide-out {
            animation: slide-out-rtl 1s ease-in-out;
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
  />
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: '({| onDismissStart: () => void |}) => Node',
        required: true,
        defaultValue: null,
        description: [
          'A children render prop function which provides an `"onDismissStart"` callback function.',
          '`"onDismissStart"` should be passed as the event handler to all the internal elements which should trigger the start of the dismiss action.',
          'This should be the initial step of the "dismiss" animation, which will set `animationState` to "out" so this animation can be initiated.',
        ],
        href: 'animationExample',
      },
      {
        name: 'onDismissEnd',
        type: '() => void',
        required: true,
        defaultValue: null,
        description: [
          'Callback fired when the `<AnimationController>` and all its children are ready to be removed from the React tree.',
          'This should be the final step of the "dismiss" animation, which will set `animationState` to "post-out" once the "out" animation has been completed.',
          'Typically, this function is used to ultimately remove the `<AnimationController>` subtree from the React tree.',
        ],
        href: 'animationExample',
      },
    ]}
  />
);

export default cards;
