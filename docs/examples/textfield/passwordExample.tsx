import {ReactNode, useState} from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [password, setPassword] = useState<string>('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
