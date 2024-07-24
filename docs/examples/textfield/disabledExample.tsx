import { useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('****maz@pinterest.com');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <TextField
        disabled
        id="variants-disabled"
        label="Email address"
        onChange={(e) => setValue(e.value)}
        placeholder="Name"
        value={value}
      />
    </Box>
  );
}
