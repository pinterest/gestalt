import { useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Box width={400}>
        <TextField
          autoComplete="username"
          id="header-example"
          label="Username"
          onChange={({ value }) => {
            setInput(value);
          }}
          placeholder="Please enter your username"
          type="text"
          value={input}
        />
      </Box>
    </Flex>
  );
}
