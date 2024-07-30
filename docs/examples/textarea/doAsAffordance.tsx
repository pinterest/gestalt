import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextArea
        id="best-practices-do-content-length"
        label="Board description"
        onChange={({ value }) => setInput(value)}
        placeholder="What's your board about?"
        value={input}
      />
    </Box>
  );
}
