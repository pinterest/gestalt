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
          min={20}
          max={200}
          step={10}
          onChange={({ value }) => setSizePx(value)}
        />

        <Pulsar size={sizePX} />
      </Flex>
    </Box>
  );
}
