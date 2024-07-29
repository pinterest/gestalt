import { useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [password, setPassword] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextField
        autoComplete="new-password"
        errorMessage="Password is too short! You need 20+ characters"
        id="best-practices-do-error-message"
        label="Password"
        onChange={({ value }) => setPassword(value)}
        type="password"
        value={password}
      />
    </Box>
  );
}
