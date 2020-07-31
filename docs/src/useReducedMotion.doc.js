// @flow strict
import * as React from 'react';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="useReducedMotion"
    description={`
      \`useReducedMotion\` uses the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" target="_blank">prefers-reduced-motion</a> CSS media feature to detect
      if the user has requested that the system minimize the amount of non-essential motion.
    `}
  />
);

card(
  <Example
    id="basicExample"
    name="Example"
    defaultCode={`
function Example() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: \`
        @keyframes vibrate {
          0% {
            transform: translate(0);
          }
          33% {
            transform: translate(-2px, -2px);
          }
          66% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
      \`}} />
      <div
        style={
          shouldReduceMotion
            ? {}
            : { animation: 'vibrate 0.3s linear infinite both' }
        }
      >
        <Box color="red" display="inlineBlock" padding={4}>
          <Text color="white">{shouldReduceMotion ? 'Reduced motion enabled' : 'Reduced motion disabled'}</Text>
        </Box>
      </div>
    </>
  );
}`}
  />
);

export default cards;
