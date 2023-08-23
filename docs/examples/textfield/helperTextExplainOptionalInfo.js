// @flow strict
import { type Node, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box padding={2} color="light">
        <TextField
          autoComplete="new-password"
          helperText="Password should be at least 20 characters long"
          id="variants-helper-text"
          label="Password"
          onChange={(e) => {
            setValue(e.value);
          }}
          type="password"
          value={value}
        />
      </Box>
    </Box>
  );
}
