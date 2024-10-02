import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextArea
        id="best-practices-dont-placeholder"
        label="Campaign description"
        onChange={({ value }) => setInput(value)}
        placeholder="Maximum of 500 characters"
        value={input}
      />
    </Box>
  );
}
