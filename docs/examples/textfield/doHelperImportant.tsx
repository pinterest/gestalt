import { useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [password, setPassword] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextField
        autoComplete="new-password"
        helperText="Password should be at least 20 characters in length"
        id="best-practices-do-helper-text"
        label="New password"
        onChange={({ value }) => setPassword(value)}
        type="password"
        value={password}
      />
    </Box>
  );
}
