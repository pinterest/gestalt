import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {

  const [input, setInput] = useState('https://www.pinterest.com/pin/768145280205600341/');

  return (
    <Box padding={8} width="100%">
      <TextArea
        id="best-practices-dont-single-line"
        label="Destination URL"
                  onChange={({ value }) => setInput(value)}

        value={input}
      />
    </Box>
  );
}
