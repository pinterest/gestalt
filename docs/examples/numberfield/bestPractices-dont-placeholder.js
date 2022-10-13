// @flow strict
import { useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): React$Node {
  const [currentValue, setCurrentValue] = useState();

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
