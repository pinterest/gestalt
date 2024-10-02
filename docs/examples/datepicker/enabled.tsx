import { useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  const [dateValue, setDateValue] = useState<Date | null>(new Date(1985, 6, 4));

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={2}>
        <DatePicker
          id="example-enabled"
          label="User Activation Date"
          onChange={({ value }) => setDateValue(value)}
          value={dateValue}
        />
      </Box>
    </Flex>
  );
}
