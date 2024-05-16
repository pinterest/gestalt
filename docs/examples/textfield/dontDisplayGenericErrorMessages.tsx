import {ReactNode, useState} from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box color="light" padding={2}>
        <TextField
          autoComplete="new-password"
          errorMessage="There is an error"
          id="best-practices-dont-error-message"
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
