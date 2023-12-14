// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Heading, TextField } from 'gestalt';

export default function TextFieldSizes(): Node {
  const [input1text, setInput1Text] = useState('');
  const [input2text, setInput2Text] = useState('');
  const [input3text, setInput3Text] = useState('');

  return (
    <Box padding={8}>
      <Flex direction="column" gap={{ column: 6, row: 0 }}>
        <Flex direction="column" gap={{ column: 3, row: 0 }}>
          <Heading size="300">Small</Heading>
          <TextField
            id="field1"
            helperText="Enter a title that captures the imagination of Pinners"
            label="Email Address"
            onChange={({ value }) => {
              setInput1Text(value);
            }}
            placeholder="Enter your pin title"
            type="text"
            size="sm"
            value={input1text}
          />
        </Flex>

        <Flex direction="column" gap={{ column: 3, row: 0 }}>
          <Heading size="300">Medium</Heading>
          <TextField
            id="field2"
            helperText="Enter a title that captures the imagination of Pinners"
            label="Title"
            onChange={({ value }) => {
              setInput2Text(value);
            }}
            size="md"
            placeholder="Enter your pin title"
            type="text"
            value={input2text}
          />
        </Flex>
        <Flex direction="column" gap={{ column: 3, row: 0 }}>
          <Heading size="300">Large</Heading>
          <TextField
            id="field3"
            helperText="Enter a title that captures the imagination of Pinners"
            label="Title"
            onChange={({ value }) => {
              setInput3Text(value);
            }}
            placeholder="Enter your pin title"
            type="text"
            size="lg"
            value={input3text}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
