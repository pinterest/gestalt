import { useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  const [dateValue, setDateValue] = useState<Date | null>(new Date(1985, 6, 4));

  return (
    <Box padding={8} width="100%">
      <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
        <DatePicker
          id="main"
          label="Select a date"
          onChange={({ value }) => setDateValue(value)}
          value={dateValue}
        />
      </Flex>
    </Box>
  );
}
