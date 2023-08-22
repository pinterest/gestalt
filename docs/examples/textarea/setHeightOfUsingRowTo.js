// @flow strict
import { type Node, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width="100%">
        <TextArea
          id="best-practices-do-height"
          label="Have feedback on this product?"
          onChange={(e) => {
            setValue(e.value);
          }}
          placeholder="Tell us about your experience, what you love, or what we could improve."
          helperText="Please don't submit passwords, email addresses, or other sensitive or personal info."
          rows={5}
          value={value}
        />
      </Box>
    </Box>
  );
}
