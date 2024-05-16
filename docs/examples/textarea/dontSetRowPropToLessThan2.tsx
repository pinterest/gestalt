import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width="100%">
        <TextArea
          id="best-practices-dont-row-height-1"
          label="Send a message"
          onChange={(e) => {
            setValue(e.value);
          }}
          rows={1}
          value={value}
        />
      </Box>
    </Box>
  );
}
