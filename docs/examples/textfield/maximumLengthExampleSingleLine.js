// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function TextFieldExample(): Node {
  const [valueA, setValueA] = useState('Delicious vegan soup');
  const [valueB, setValueB] = useState('Delicious vegan noodle soup');

  const characterCount = 20;
  const errorAccessibilityLabel = 'Limit reached. You can only use 20 characters in this field.';

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={12}>
        <TextField
          id="maxLengthReached"
          label="Title"
          helperText="Enter a title that captures the imagination of Pinners"
          onChange={({ value }) => setValueA(value)}
          placeholder="Enter your pin title"
          value={valueA}
          onBlur={() => {}}
          onFocus={() => {}}
          maxLength={{ characterCount, errorAccessibilityLabel }}
        />
        <TextField
          id="maxLengthExceeded"
          label="Title"
          helperText="Enter a title that captures the imagination of Pinners"
          onChange={({ value }) => setValueB(value)}
          placeholder="Enter your pin title"
          value={valueB}
          onBlur={() => {}}
          onFocus={() => {}}
          maxLength={{ characterCount, errorAccessibilityLabel }}
        />
      </Flex>
    </Box>
  );
}
