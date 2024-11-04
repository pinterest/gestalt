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
          helperText="Select from the next available dateValueDisablePast"
          id="heleprText"
          label="Customer service appointment"
          minDate={new Date()}
          onChange={({ value }) => setDateValueMd(value)}
          size="md"
          value={dateValueMd}
        />
        <DatePicker
          helperText="Select from the next available dateValueDisablePast"
          id="heleprText"
          label="Customer service appointment"
          minDate={new Date()}
          onChange={({ value }) => setDateValueLg(value)}
          size="lg"
          value={dateValueLg}
        />
      </Flex>
    </Box>
  );
}
