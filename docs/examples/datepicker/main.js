// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): ReactNode {
  const [dateValue, setDateValue] = useState<Date | null>(new Date(1985, 6, 4));

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={2}>
        <DatePicker
          id="main"
          label="Select a date"
          onChange={({ value }) => setDateValue(value)}
          value={dateValue}
        />
      </Box>
    </Flex>
  );
}
