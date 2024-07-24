import { useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function TextFieldSizes() {
  const [input1text, setInput1Text] = useState('');
  const [input2text, setInput2Text] = useState('');
  const [input3text, setInput3Text] = useState('');

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
          <TextField
            helperText="Helper text"
            id="field1"
            label="Label"
            onChange={({ value }) => {
              setInput1Text(value);
            }}
            placeholder="Placeholder"
            size="sm"
            type="text"
            value={input1text}
          />

          <TextField
            helperText="Helper text"
            id="field2"
            label="Label"
            onChange={({ value }) => {
              setInput2Text(value);
            }}
            placeholder="Placeholder"
            size="md"
            type="text"
            value={input2text}
          />
          <TextField
            helperText="Helper text"
            id="field3"
            label="Label"
            onChange={({ value }) => {
              setInput3Text(value);
            }}
            placeholder="Placeholder"
            size="lg"
            type="text"
            value={input3text}
          />
      </Flex>
    </Box>
  );
}
