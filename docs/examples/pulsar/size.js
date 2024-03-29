// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, NumberField, Pulsar } from 'gestalt';

export default function Example(): ReactNode {
  const [sizePX, setSizePx] = useState<void | number>();

  return (
    <Box padding={2}>
      <Flex alignItems="center" direction="column" gap={4}>
        <NumberField
          id="size variant pixel input"
          label="Enter Pulsar size in pixels"
          max={200}
          min={20}
          onChange={({ value }) => setSizePx(value)}
          step={10}
        />

        <Pulsar size={sizePX} />
      </Flex>
    </Box>
  );
}
