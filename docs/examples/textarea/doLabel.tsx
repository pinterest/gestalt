import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextArea
        id="best-practices-do-label"
        label="Tell everyone what this Pin is about"
        onChange={({ value }) => setInput(value)}
        value={input}
      />
    </Box>
  );
}
