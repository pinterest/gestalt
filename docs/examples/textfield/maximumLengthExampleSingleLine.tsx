import { useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function TextFieldExample() {
  const [valueA, setValueA] = useState('Delicious vegan soup');
  const [valueB, setValueB] = useState('Delicious vegan noodle soup');

  const characterCount = 20;
  const errorAccessibilityLabel = 'Limit reached. You can only use 20 characters in this field.';

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={12}>
        <TextField
          helperText="Enter a title that captures the imagination of Pinners"
          id="maxLengthReached"
          label="Title"
          maxLength={{ characterCount, errorAccessibilityLabel }}
          onBlur={() => {}}
          onChange={({ value }) => setValueA(value)}
          onFocus={() => {}}
          placeholder="Enter your pin title"
          value={valueA}
        />
        <TextField
          helperText="Enter a title that captures the imagination of Pinners"
          id="maxLengthExceeded"
          label="Title"
          maxLength={{ characterCount, errorAccessibilityLabel }}
          onBlur={() => {}}
          onChange={({ value }) => setValueB(value)}
          onFocus={() => {}}
          placeholder="Enter your pin title"
          value={valueB}
        />
      </Flex>
    </Box>
  );
}
