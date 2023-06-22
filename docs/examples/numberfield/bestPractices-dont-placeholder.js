// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): Node {
  const [currentValue, setCurrentValue] = useState<void | number>();

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Box width={300}>
        <NumberField
          id="best-practices-dont-placeholder"
          label=""
          onChange={({ value }) => {
            setCurrentValue(value);
          }}
          placeholder="Code was texted to you"
          value={currentValue}
        />
      </Box>
    </Flex>
  );
}
