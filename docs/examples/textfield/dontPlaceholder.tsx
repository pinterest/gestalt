import { useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [password, setPassword] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextField
        autoComplete="new-password"
        id="best-practices-dont-placeholder"
        label=""
        onChange={({ value }) => setPassword(value)}
        placeholder="Password should be at least 20 characters in length"
        type="password"
        value={password}
      />
    </Box>
  );
}
