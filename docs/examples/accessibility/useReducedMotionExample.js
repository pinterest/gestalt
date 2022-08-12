// @flow strict
import { type Node } from 'react';
import { Box, Text, useReducedMotion } from 'gestalt';

export default function UseReducedMotionExample(): Node {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box padding={4}>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
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
              `,
        }}
      />
      <div style={shouldReduceMotion ? {} : { animation: 'vibrate 0.3s linear infinite both' }}>
        <Box color="errorBase" display="inlineBlock" padding={4}>
          <Text color="inverse">
            {shouldReduceMotion ? 'Reduced motion enabled' : 'Reduced motion not activated'}
          </Text>
        </Box>
      </div>
    </Box>
  );
}
