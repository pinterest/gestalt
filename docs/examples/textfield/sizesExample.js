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
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="300">sm</Heading>
          <TextField
            onChange={({ value }) => {
              setInput1Text(value);
            }}
            placeholder="Placeholder"
            type="text"
            size="sm"
            value={input1text}
          />
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="300">md</Heading>
          <TextField
            onChange={({ value }) => {
              setInput2Text(value);
            }}
            placeholder="Placeholder"
            type="text"
            size="md"
            value={input2text}
          />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="300">lg</Heading>
          <TextField
            onChange={({ value }) => {
              setInput3Text(value);
            }}
            placeholder="Placeholder"
            type="text"
            size="md"
            value={input3text}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
