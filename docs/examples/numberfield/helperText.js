// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): ReactNode {
  const [currentValue, setCurrentValue] = useState<void | number>();

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Box width={400}>
        <NumberField
          id="variant-helperText"
          helperText="Round up to the nearest whole number"
          label="Average value"
          onChange={({ value }) => {
            setCurrentValue(value);
          }}
          value={currentValue}
        />
      </Box>
    </Flex>
  );
}
