// @flow strict
import { type Node, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width="100%">
        <TextArea
          id="best-practices-do-helpertext"
          label="Explain what people can see in this Pin"
          onChange={(e) => {
            setValue(e.value);
          }}
          helperText="This text will be read aloud by screen readers"
          value={value}
        />
      </Box>
    </Box>
  );
}
