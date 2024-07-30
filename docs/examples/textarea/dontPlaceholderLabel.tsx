import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextArea
        id="best-practices-dont-remove-label"
                  onChange={({ value }) => setInput(value)}

        placeholder="Tell us your story"
        value={input}
      />
    </Box>
  );
}
