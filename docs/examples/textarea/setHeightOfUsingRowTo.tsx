import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width="100%">
        <TextArea
          helperText="Please don't submit passwords, email addresses, or other sensitive or personal info."
          id="best-practices-do-height"
          label="Have feedback on this product?"
          onChange={(e) => {
            setValue(e.value);
          }}
          placeholder="Tell us about your experience, what you love, or what we could improve."
          rows={5}
          value={value}
        />
      </Box>
    </Box>
  );
}
