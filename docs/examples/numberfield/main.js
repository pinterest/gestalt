// @flow strict
import { useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): React$Node {
  const [currentValue, setCurrentValue] = useState();

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Box width={500}>
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
