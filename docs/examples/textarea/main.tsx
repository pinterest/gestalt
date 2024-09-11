import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box height="100%" padding={4} width="100%">
      <TextArea
        id="headerExample"
        label="Username This simple description uses the Text component This simple description uses the Text component"
        onChange={({ value }) => setInput(value)}
        placeholder="Write something about yourself..."
        value={input}
      />
    </Box>
  );
}
