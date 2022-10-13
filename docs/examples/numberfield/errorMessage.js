// @flow strict
import { useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): React$Node {
  const [currentValue, setCurrentValue] = useState();

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Box width={400}>
        <NumberField
          id="variant-errorMessage"
          errorMessage={
            currentValue === null || currentValue === undefined ? 'You must enter a number' : null
          }
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
