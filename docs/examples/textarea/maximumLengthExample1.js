// @flow strict
import { type Node, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function TextAreaExample(): Node {
  const [value, setValue] = useState('');
  const characterCount = 200;

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <TextArea
        id="maxLength"
        label="Alt text"
        helperText="Describe your image with detail so visually impaired users can understand your Pin"
        onChange={(e) => setValue(e.value)}
        placeholder="Enter the image alt text"
        value={value}
        onBlur={() => {}}
        onFocus={() => {}}
        rows={4}
        maxLength={{
          characterCount,
          errorAccessibilityLabel: 'Limit reached. You can only use 200 characters in this field.',
        }}
      />
    </Box>
  );
}
