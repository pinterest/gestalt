import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextArea
        helperText="Please don't submit passwords, email addresses, or other sensitive or personal info."
        id="best-practices-do-height"
        label="Have feedback on this product?"
        onChange={({ value }) => setInput(value)}
        placeholder="Tell us about your experience, what you love, or what we could improve."
        rows={5}
        value={input}
      />
    </Box>
  );
}
