// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text, useReducedMotion } from 'gestalt';

export default function Example(): ReactNode {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
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
        <Box color="infoBase" display="inlineBlock" padding={4}>
          <Text color="inverse">
            {shouldReduceMotion ? 'Reduced motion enabled' : 'Reduced motion disabled'}
          </Text>
        </Box>
      </div>
    </Flex>
  );
}
