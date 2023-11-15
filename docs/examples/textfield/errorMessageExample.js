// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example(): ReactNode {
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
