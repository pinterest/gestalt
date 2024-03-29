// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): ReactNode {
  const [currentValue, setCurrentValue] = useState<void | number>();

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box width={400}>
        <NumberField
          errorMessage={
            currentValue === null || currentValue === undefined ? 'You must enter a number' : null
          }
          id="variant-errorMessage"
          label="With an error message"
          onChange={({ value }) => {
            setCurrentValue(value);
          }}
          value={currentValue}
        />
      </Box>
    </Flex>
  );
}
