// @flow strict
import { useState, type Node } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): Node {
  const [dateValue, setDateValue] = useState<Date | void>(new Date(1985, 6, 4));

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={2}>
        <DatePicker
          id="example-basic"
          label="Select a date"
          onChange={({ value }) => setDateValue(value)}
          value={dateValue}
        />
      </Box>
    </Flex>
  );
}
