// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function Example(): ReactNode {
  const [cityValue, setCityValue] = useState('');
  const [stateValue, setStateValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex gap={{ column: 0, row: 4 }}>
        <TextField
          id="best-practices-do-related-city"
          label="City"
          onChange={({ value }) => {
            setCityValue(value);
          }}
          type="text"
          value={cityValue}
        />
        <TextField
          id="best-practices-do-related-state"
          label="State"
          onChange={({ value }) => {
            setStateValue(value);
          }}
          type="text"
          value={stateValue}
        />
      </Flex>
    </Box>
  );
}
