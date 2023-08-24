// @flow strict
import { type Node, useState } from 'react';
import { Box, Checkbox, Flex } from 'gestalt';

export default function Example(): Node {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 0, row: 6 }}>
        <Checkbox
          checked={checked1}
          id="sm"
          label="Small size"
          onChange={({ checked }) => setChecked1(checked)}
          size="sm"
        />
        <Checkbox
          checked={checked2}
          id="md"
          label="Medium size"
          onChange={({ checked }) => setChecked2(checked)}
        />
      </Flex>
    </Box>
  );
}
