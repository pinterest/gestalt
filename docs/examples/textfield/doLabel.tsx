import { useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [username, setUsername] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextField
        autoComplete="username"
        id="best-practices-do-label"
        label="Username"
        onChange={({ value }) => {
          setUsername(value);
        }}
        type="text"
        value={username}
      />
    </Box>
  );
}
