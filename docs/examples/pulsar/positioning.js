// @flow strict
import { type Node } from 'react';
import { Box, Button, Pulsar } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={2}>
      <Box margin={12}>
        <Button text="New feature - click me!" />

        <Box position="absolute" top marginStart={8} marginTop={3}>
          <Pulsar />
        </Box>
      </Box>
    </Box>
  );
}
