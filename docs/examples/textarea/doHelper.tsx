import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextArea
        helperText="This text will be read aloud by screen readers"
        id="best-practices-do-helpertext"
        label="Explain what people can see in this Pin"
                 onChange={({ value }) => setInput(value)}

        value={input}
      />
    </Box>
  );
}
