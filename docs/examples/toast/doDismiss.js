// @flow strict
import { type Node } from 'react';
import { Box, Flex, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Box paddingY={4} width="100%" height="100%">
      <Flex alignItems="end" justifyContent="center" width="100%" height="100%">
        <Toast
          dismissButton={{ onDismiss: () => {} }}
          text="You blocked this user. They won't see your Pins unless you unblock them."
        />
      </Flex>
    </Box>
  );
}
