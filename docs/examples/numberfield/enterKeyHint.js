// @flow strict
import { useState, type Node } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): Node {
  const [currentValue, setCurrentValue] = useState<void | number>();

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Box width={300}>
        <NumberField
          mobileEnterKeyHint="next"
          id="enterKeyHint"
          label="Age"
          onChange={({ value }) => {
            setCurrentValue(value);
          }}
          value={currentValue}
        />
      </Box>
    </Flex>
  );
}
