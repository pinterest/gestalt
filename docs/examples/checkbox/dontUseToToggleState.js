// @flow strict
import { type Node, useState } from 'react';
import { Box, Checkbox } from 'gestalt';

export default function Example(): Node {
  const [checked1, setChecked1] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Checkbox
        checked={checked1}
        id="location"
        label="Turn location tracking off"
        helperText="Change will auto-save"
        onChange={({ checked }) => setChecked1(checked)}
      />
    </Box>
  );
}
