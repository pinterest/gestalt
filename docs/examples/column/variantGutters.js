// @flow strict
import { type Node } from 'react';
import { Box, Column, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box paddingY={2} color="dark" height="100%" width="100%">
      <Box paddingX={2} marginBottom={2}>
        <Text color="inverse">Content</Text>
      </Box>

      <Box
        display="flex"
        direction="row"
        paddingY={12}
        marginStart={-2}
        marginEnd={-2}
        color="tertiary"
        wrap
      >
        <Column span={12}>
          <Box paddingX={2} marginBottom={4}>
            <Text color="inverse">Row</Text>
          </Box>
        </Column>
        <Column span={6}>
          <Box paddingX={2}>
            <Box color="default" padding={4}>
              <Text color="dark">Column A</Text>
            </Box>
          </Box>
        </Column>
        <Column span={6}>
          <Box paddingX={2}>
            <Box color="default" padding={4}>
              <Text color="dark">Column B</Text>
            </Box>
          </Box>
        </Column>
      </Box>
    </Box>
  );
}
