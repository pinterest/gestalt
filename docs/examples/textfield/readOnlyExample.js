// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example(): ReactNode {
  const [value, setValue] = useState('****maz@pinterest.com');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <TextField
        id="variants-readonly"
        label="Email address"
        onChange={(e) => setValue(e.value)}
        placeholder="Name"
        readOnly
        value={value}
      />
    </Box>
  );
}
