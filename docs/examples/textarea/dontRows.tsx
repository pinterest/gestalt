import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextArea
        id="best-practices-dont-row-height-1"
        label="Send a message"
                onChange={({ value }) => setInput(value)}

        rows={1}
        value={input}
      />
    </Box>
  );
}
