// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, FixedZIndex, Text } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={2} width={300} height={150}>
        <Box
          column={12}
          dangerouslySetInlineStyle={{ __style: { isolation: 'isolate' } }}
          height={100}
          overflow="scroll"
          tabIndex={0}
          padding={2}
        >
          <Box
            color="infoBase"
            width="25%"
            height={60}
            zIndex={new FixedZIndex(2)}
            position="fixed"
            marginTop={12}
            opacity={0.7}
            padding={5}
          >
            <Text color="light">FixedZIndex = 2</Text>
          </Box>
          <Box
            color="errorBase"
            width="25%"
            height={120}
            zIndex={new FixedZIndex(1)}
            position="fixed"
            marginStart={4}
            padding={5}
          >
            <Text color="light">FixedZIndex = 1</Text>
          </Box>
        </Box>
      </Box>
    </ColorSchemeProvider>
  );
}
