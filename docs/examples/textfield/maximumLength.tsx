import { useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function TextFieldExample() {
  const [value, setValue] = useState('');
  const characterCount = 20;

  return (
    <Box padding={8} width="100%">
      <TextField
        helperText="Enter a title that captures the imagination of Pinners"
        id="maxLength"
        label="Title"
        maxLength={{
          characterCount,
          errorAccessibilityLabel: 'Limit reached. You can only use 20 characters in this field.',
        }}
        onBlur={() => {}}
        onChange={(e) => setValue(e.value)}
        onFocus={() => {}}
        placeholder="Enter your pin title"
        value={value}
      />
    </Box>
  );
}
