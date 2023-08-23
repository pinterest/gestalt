// @flow strict
import { type Node, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('****maz@pinterest.com');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <TextField
        id="variants-readonly"
        label="Email address"
        onChange={(e) => setValue(e.value)}
        placeholder="Name"
        value={value}
        readOnly
      />
    </Box>
  );
}
