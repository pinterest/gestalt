// @flow strict
import { type Node, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function TextFieldExample(): Node {
  const [value, setValue] = useState('');
  const characterCount = 20;

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <TextField
        id="maxLength"
        label="Title"
        helperText="Enter a title that captures the imagination of Pinners"
        onChange={(e) => setValue(e.value)}
        placeholder="Enter your pin title"
        value={value}
        onBlur={() => {}}
        onFocus={() => {}}
        maxLength={{
          characterCount,
          errorAccessibilityLabel: 'Limit reached. You can only use 20 characters in this field.',
        }}
      />
    </Box>
  );
}
