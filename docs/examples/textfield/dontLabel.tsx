import { useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextField
        autoComplete="username"
        id="best-practices-dont-label"
        label=""
        onChange={(e) => {
          setValue(e.value);
        }}
        value={value}
      />
    </Box>
  );
}
