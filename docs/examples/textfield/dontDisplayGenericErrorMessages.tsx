import { useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [password, setPassword] = useState('');

  return (
    <Box padding={8} width="100%">
      <Box color="light" padding={2}>
        <TextField
          autoComplete="new-password"
          errorMessage="There is an error"
          id="best-practices-dont-error-message"
          label="Password"
          onChange={({ value } ) => setPassword(value)}
          type="password"
          value={password}
        />
      </Box>
    </Box>
  );
}
