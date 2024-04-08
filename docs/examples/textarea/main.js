// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example(): ReactNode {
  const [input, setInput] = useState('');

  return (
    <Box height="100%" padding={4} width="100%">
      <TextArea
        id="headerExample"
        label="About me"
        onChange={({ value }) => setInput(value)}
        placeholder="Write something about yourself..."
        value={input}
      />
    </Box>
  );
}
