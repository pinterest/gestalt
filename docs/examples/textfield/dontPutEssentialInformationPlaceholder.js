// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example(): ReactNode {
  const [value, setValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box padding={2} color="light">
        <TextField
          autoComplete="new-password"
          id="best-practices-dont-placeholder"
          label=""
          onChange={(e) => {
            setValue(e.value);
          }}
          placeholder="Password should be at least 20 characters in length"
          type="password"
          value={value}
        />
      </Box>
    </Box>
  );
}
