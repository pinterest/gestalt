// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Text size="100">
        We are all here together in freedom, for perhaps the last time! I know, dear; I know that
        you will always be with me to the end.
      </Text>
    </Box>
  );
}
