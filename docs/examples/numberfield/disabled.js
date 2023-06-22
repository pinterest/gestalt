// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): Node {
  const [currentValue, setCurrentValue] = useState<void | number>();

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Box width={400}>
        <NumberField
          disabled
          id="variant-disabled"
          label="Disabled"
          onChange={({ value }) => {
            setCurrentValue(value);
          }}
          placeholder="This input is disabled"
          value={currentValue}
        />
      </Box>
    </Flex>
  );
}
