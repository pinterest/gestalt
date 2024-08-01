import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextArea
        helperText="Describe your favorite hobbies, foods, or books."
        id="aboutmemore"
        label="About me"
        onChange={({ value }) => setInput(value)}
        placeholder="Write something about yourself..."
        value={input}
      />
    </Box>
  );
}
