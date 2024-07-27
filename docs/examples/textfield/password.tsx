import { useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function Example() {
  const [password, setPassword] = useState<string>('');

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <TextField
          id="enter-password"
          label="Account password"
          onChange={({ value }) => setPassword(value)}
          placeholder="6-18 characters"
          size="sm"
          type="password"
          value={password}
        />
        <TextField
          id="enter-password"
          label="Account password"
          onChange={({ value }) => setPassword(value)}
          placeholder="6-18 characters"
          size="md"
          type="password"
          value={password}
        />
        <TextField
          id="enter-password"
          label="Account password"
          onChange={({ value }) => setPassword(value)}
          placeholder="6-18 characters"
          size="lg"
          type="password"
          value={password}
        />
      </Flex>
    </Box>
  );
}
