import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function TextAreaExample() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <TextArea
        helperText="Describe your image with detail so visually impaired users can understand your Pin"
        id="maxLength"
        label="Alt text"
        maxLength={{
          characterCount: 200,
          errorAccessibilityLabel: 'Limit reached. You can only use 200 characters in this field.',
        }}
        onBlur={() => {}}
        onChange={({ value }) => setInput(value)}
        onFocus={() => {}}
        placeholder="Enter the image alt text"
        rows={4}
        value={input}
      />
    </Box>
  );
}
