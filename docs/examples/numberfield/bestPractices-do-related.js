// @flow strict
import { useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): React$Node {
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();

  return (
    <Box height="100%" padding={3}>
      <Flex alignItems="center" gap={4} justifyContent="center" height="100%" width="100%">
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
