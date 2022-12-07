// @flow strict
import { type Node, useState } from 'react';
import { Box, Button, Flex, Pulsar } from 'gestalt';

export default function Example(): Node {
  const [isPaused, setIsPaused] = useState(false);

  const text = isPaused ? 'Click to show' : 'Click to hide';

  return (
    <Box padding={2}>
      <Flex alignItems="center" direction="column" gap={4}>
        <Button text={text} onClick={() => setIsPaused((currVal) => !currVal)} size="md" />

        <Pulsar paused={isPaused} />
      </Flex>
    </Box>
  );
}
