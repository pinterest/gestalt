import {ReactNode, useState} from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <div className="skip-accessibility-check">
        <Box color="light" padding={2}>
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
      </div>
    </Box>
  );
}
