// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, FixedZIndex, Text } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" height={150} padding={2} width={300}>
        <Box
          column={12}
          dangerouslySetInlineStyle={{ __style: { isolation: 'isolate' } }}
          height={100}
          overflow="scroll"
          padding={2}
          tabIndex={0}
        >
          <Box
            color="infoBase"
            height={60}
            marginTop={12}
            opacity={0.7}
            padding={5}
            position="fixed"
            width="25%"
            zIndex={new FixedZIndex(2)}
          >
            <Text color="light">FixedZIndex = 2</Text>
          </Box>
          <Box
            color="errorBase"
            height={120}
            marginStart={4}
            padding={5}
            position="fixed"
            width="25%"
            zIndex={new FixedZIndex(1)}
          >
            <Text color="light">FixedZIndex = 1</Text>
          </Box>
        </Box>
      </Box>
    </ColorSchemeProvider>
  );
}
