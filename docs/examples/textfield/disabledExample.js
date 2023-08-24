// @flow strict
import { type Node, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
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
