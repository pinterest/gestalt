import {ReactNode, useState} from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box color="light" padding={2}>
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
