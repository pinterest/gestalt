// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): Node {
  const [dateValue, setDateValue] = useState<Date | null>(null);

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={2}>
        <DatePicker
          id="heleprText"
          label="Customer service appointment"
          onChange={({ value }) => setDateValue(value)}
          value={dateValue}
          helperText="Select from the next available dateValueDisablePast"
          minDate={new Date()}
        />
      </Box>
    </Flex>
  );
}
