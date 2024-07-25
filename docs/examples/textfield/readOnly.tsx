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
          id="variants-readonly-sm"
          label="Email address"
          onChange={({ value }) => setValueSm(value)}
          placeholder="Email"
          readOnly
          value={valueSm}
        />
        <TextField
          id="variants-readonly-md"
          label="Email address"
          onChange={({ value }) => setValueMd(value)}
          placeholder="Email"
          readOnly
          value={valueMd}
        />
        <TextField
          id="variants-readonly-lg"
          label="Email address"
          onChange={({ value }) => setValueLg(value)}
          placeholder="Email"
          readOnly
          value={valueLg}
        />
      </Flex>
    </Box>
  );
}
