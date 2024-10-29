import { useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  const [dateValueMd, setDateValueMd] = useState<Date | null>(null);
  const [dateValueLg, setDateValueLg] = useState<Date | null>(null);

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={4}>
        <DatePicker
          id="example-errorMessage-md"
          label="Schedule your training"
          onChange={({ value }) => setDateValueMd(value)}
          size="md"
          value={dateValueMd}
        />
        <DatePicker
          id="example-errorMessage-md"
          label="Schedule your training"
          onChange={({ value }) => setDateValueLg(value)}
          size="lg"
          value={dateValueLg}
        />
      </Flex>
    </Box>
  );
}
