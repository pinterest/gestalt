// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Checkbox, Flex } from 'gestalt';

export default function Example(): ReactNode {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
