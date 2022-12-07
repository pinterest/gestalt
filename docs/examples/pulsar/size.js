// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, NumberField, Pulsar } from 'gestalt';

export default function Example(): Node {
  const [sizePX, setSizePx] = useState();

  return (
    <Box padding={2}>
      <Flex alignItems="center" direction="column" gap={4}>
        <NumberField
          id="size variant pixel input"
          label="Enter Pulsar size in pixels"
          min={20}
          step={10}
          onChange={({ value }) => setSizePx(value)}
        />

        <Pulsar size={sizePX} />
      </Flex>
    </Box>
  );
}
