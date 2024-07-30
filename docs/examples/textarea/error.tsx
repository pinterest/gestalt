import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextArea
        errorMessage={!input ? "This field can't be blank!" : null}
        id="witherror"
        label="About me"
          onChange={({ value }) => setInput(value)}
        placeholder="Write something about yourself..."
        value={input}
      />
    </Box>
  );
}
