// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function Example(): Node {
  const [cityValue, setCityValue] = useState('');
  const [stateValue, setStateValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
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
