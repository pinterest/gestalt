// @flow strict
import { type Node, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width="100%">
        <TextArea
          id="best-practices-dont-placeholder"
          label="Campaign description"
          onChange={(e) => {
            setValue(e.value);
          }}
          placeholder="Maximum of 500 characters"
          value={value}
        />
      </Box>
    </Box>
  );
}
