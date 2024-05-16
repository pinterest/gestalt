import {ReactNode, useState} from 'react';
import { Box, Flex, Heading, TextField } from 'gestalt';

export default function TextFieldSizes() {
  const [input1text, setInput1Text] = useState('');
  const [input2text, setInput2Text] = useState('');
  const [input3text, setInput3Text] = useState('');

  return (
    <Box padding={8}>
      <Flex direction="column" gap={{ column: 6, row: 0 }}>
        <Flex direction="column" gap={{ column: 3, row: 0 }}>
          <Heading size="300">Small</Heading>
          <TextField
            helperText="Enter a title that captures the imagination of Pinners"
            id="field1"
            label="Email Address"
            onChange={({ value }) => {
              setInput1Text(value);
            }}
            placeholder="Enter your pin title"
            size="sm"
            type="text"
            value={input1text}
          />
        </Flex>

        <Flex direction="column" gap={{ column: 3, row: 0 }}>
          <Heading size="300">Medium</Heading>
          <TextField
            helperText="Enter a title that captures the imagination of Pinners"
            id="field2"
            label="Title"
            onChange={({ value }) => {
              setInput2Text(value);
            }}
            placeholder="Enter your pin title"
            size="md"
            type="text"
            value={input2text}
          />
        </Flex>
        <Flex direction="column" gap={{ column: 3, row: 0 }}>
          <Heading size="300">Large</Heading>
          <TextField
            helperText="Enter a title that captures the imagination of Pinners"
            id="field3"
            label="Title"
            onChange={({ value }) => {
              setInput3Text(value);
            }}
            placeholder="Enter your pin title"
            size="lg"
            type="text"
            value={input3text}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
