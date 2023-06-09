// @flow strict
import { useState, type Node } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): Node {
  const [dateValue, setDateValue] = useState<Date | void>(undefined);

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={2}>
        <DatePicker
          errorMessage={dateValue ? undefined : "This field can't be blank!"}
          helperText="Select a preferred day for your training."
          id="example-errorMessage"
          label="Schedule your training"
          onChange={({ value }) => setDateValue(value)}
        />
      </Box>
    </Flex>
  );
}
