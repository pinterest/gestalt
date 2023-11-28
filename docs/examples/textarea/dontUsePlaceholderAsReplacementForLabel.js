// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example(): ReactNode {
  const [value, setValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width="100%">
        <TextArea
          id="best-practices-dont-remove-label"
          onChange={(e) => {
            setValue(e.value);
          }}
          placeholder="Tell us your story"
          value={value}
        />
      </Box>
    </Box>
  );
}
