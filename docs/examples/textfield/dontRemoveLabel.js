// @flow strict
import { type Node, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <div className="skip-accessibility-check">
        <Box padding={2} color="light">
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
