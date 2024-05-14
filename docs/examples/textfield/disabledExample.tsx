import { useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <TextField
        disabled
        id="variants-disabled"
        label="New password"
        onChange={(e) => {
          setValue(e.value);
        }}
        placeholder="6-18 characters"
        value={value}
      />
    </Box>
  );
}
