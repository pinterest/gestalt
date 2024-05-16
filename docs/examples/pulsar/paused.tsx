import { useState } from 'react';
import { Box, Button, Flex, Pulsar } from 'gestalt';

export default function Example() {
  const [isPaused, setIsPaused] = useState(false);

  const text = isPaused ? 'Click to show' : 'Click to hide';

  return (
    <Box padding={2}>
      <Flex alignItems="center" direction="column" gap={4}>
        <Button onClick={() => setIsPaused((currVal) => !currVal)} size="md" text={text} />

        <Pulsar paused={isPaused} />
      </Flex>
    </Box>
  );
}
