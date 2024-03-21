// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example(): ReactNode {
  const [value, setValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box color="light" padding={2}>
        <TextField
          autoComplete="username"
          id="best-practices-do-label"
          label="Username"
          onChange={(e) => {
            setValue(e.value);
          }}
          type="text"
          value={value}
        />
      </Box>
    </Box>
  );
}
