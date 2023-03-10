// @flow strict
import { useState, type Node } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example(): Node {
  const [input, setInput] = useState('');

  return (
    <Box width="100%" height="100%" padding={4}>
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
  );
}
