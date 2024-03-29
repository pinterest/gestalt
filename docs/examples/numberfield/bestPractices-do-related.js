// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): ReactNode {
  const [height, setHeight] = useState<void | number>();
  const [width, setWidth] = useState<void | number>();

  return (
    <Box height="100%" padding={3}>
      <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
        <NumberField
          id="best-practices-do-related-height"
          label="Height"
          onChange={({ value }) => {
            setHeight(value);
          }}
          value={height}
        />
        <NumberField
          id="best-practices-do-related-width"
          label="Width"
          onChange={({ value }) => {
            setWidth(value);
          }}
          value={width}
        />
      </Flex>
    </Box>
  );
}
