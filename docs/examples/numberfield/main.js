// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): Node {
  const [currentValue, setCurrentValue] = useState<void | number>();

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Box width={400}>
        <NumberField
          id="header-example"
          label="Number of widgets"
          onChange={({ value }) => {
            setCurrentValue(value);
          }}
          placeholder="Please enter the number of widgets"
          value={currentValue}
        />
      </Box>
    </Flex>
  );
}
