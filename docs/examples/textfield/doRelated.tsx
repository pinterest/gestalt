import { useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function Example() {
  const [cityValue, setCityValue] = useState('');
  const [stateValue, setStateValue] = useState('');

  return (
    <Box padding={8} width="100%">
      <Flex gap={4} width="100%">
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
