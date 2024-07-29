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
          disabled
          id="variants-disabled-sm"
          label="Email address"
          onChange={({ value }) => setValueSm(value)}
          placeholder="Name"
          size="sm"
          value={valueSm}
        />
        <TextField
          disabled
          id="variants-disabled-md"
          label="Email address"
          onChange={({ value }) => setValueMd(value)}
          placeholder="Name"
          size="md"
          value={valueMd}
        />
        <TextField
          disabled
          id="variants-disabled-lg"
          label="Email address"
          onChange={({ value }) => setValueLg(value)}
          placeholder="Name"
          size="lg"
          value={valueLg}
        />
      </Flex>
    </Box>
  );
}
