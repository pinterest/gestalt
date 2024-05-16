import {ReactNode, useState} from 'react';
import { Box, TextArea } from 'gestalt';

export default function TextAreaExample() {
  const [value, setValue] = useState('');
  const characterCount = 200;

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <TextArea
        helperText="Describe your image with detail so visually impaired users can understand your Pin"
        id="maxLength"
        label="Alt text"
        maxLength={{
          characterCount,
          errorAccessibilityLabel: 'Limit reached. You can only use 200 characters in this field.',
        }}
        onBlur={() => {}}
        onChange={(e) => setValue(e.value)}
        onFocus={() => {}}
        placeholder="Enter the image alt text"
        rows={4}
        value={value}
      />
    </Box>
  );
}
