// @flow strict
import { type Node, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example(): Node {
  const [input, setInput] = useState('');

  return (
    <Box width="100%" height="100%" padding={4}>
      <TextArea
        id="headerExample"
        onChange={({ value }) => setInput(value)}
        placeholder="Write something about yourself..."
        label="About me"
        value={input}
      />
    </Box>
  );
}
