import { useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function Example() {
  const [valueSm, setValueSm] = useState('****maz@pinterest.com');
  const [valueMd, setValueMd] = useState('****maz@pinterest.com');
  const [valueLg, setValueLg] = useState('****maz@pinterest.com');

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <TextField
          id="variants-defaul-sm"
          label="Email address"
          onChange={({ value }) => setValueSm(value)}
          placeholder="Email"
          size="sm"
          value={valueSm}
        />
        <TextField
          id="variants-default-md"
          label="Email address"
          onChange={({ value }) => setValueMd(value)}
          placeholder="Email"
          size="md"
          value={valueMd}
        />
        <TextField
          id="variants-default-lg"
          label="Email address"
          onChange={({ value }) => setValueLg(value)}
          placeholder="Email"
          size="lg"
          value={valueLg}
        />
      </Flex>
    </Box>
  );
}
