import { useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <TextField
        errorMessage={!value ? "This field can't be blank!" : null}
        id="error example"
        label="Email address"
        onChange={(e) => setValue(e.value)}
        placeholder="Email"
        value={value}
      />
    </Box>
  );
}
