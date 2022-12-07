// @flow strict
import { type Node, useState } from 'react';
import { Box, Button, Flex, Pulsar } from 'gestalt';

export default function Example(): Node {
  const [isPulsing, setIsPulsing] = useState(true);

  const text = isPulsing ? 'Click to hide' : 'Click to show';

  return (
    <Box padding={2}>
      <Flex alignItems="center" direction="column" gap={4}>
        <Button text={text} onClick={() => setIsPulsing((currVal) => !currVal)} size="md" />

        <Pulsar paused={!isPulsing} />
      </Flex>
    </Box>
  );
}
