// @flow strict
import { type Node, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example(): Node {
  const [password, setPassword] = useState<string>('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <TextField
        id="enter-password"
        label="Account password"
        onChange={({ value }) => setPassword(value)}
        placeholder="Password"
        type="password"
        value={password}
      />
    </Box>
  );
}
