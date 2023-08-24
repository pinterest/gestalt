// @flow strict
import { type Node, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <TextField
        errorMessage={!value ? "This field can't be blank!" : null}
        id="variants-error-message"
        label="New username"
        onChange={(e) => {
          setValue(e.value);
        }}
        value={value}
      />
    </Box>
  );
}
