// @flow strict
import { useState, type Node } from 'react';
import { Box, Checkbox } from 'gestalt';

export default function Example(): Node {
  const [checked1, setChecked1] = useState(false);

  return (
    <Box width="100%" height="100%" padding={4}>
      <Checkbox
        checked={checked1}
        id="checkbox"
        label="I agree that this is a checkbox"
        onChange={({ checked }) => setChecked1(checked)}
        helperText="Nothing will happen if you disagree"
      />
    </Box>
  );
}
