import { ReactNode, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  const [dateValue, setDateValue] = useState<Date | null>(null);

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={2}>
        <DatePicker
          helperText="Select from the next available dateValueDisablePast"
          id="heleprText"
          label="Customer service appointment"
          minDate={new Date()}
          onChange={({ value }) => setDateValue(value)}
          value={dateValue}
        />
      </Box>
    </Flex>
  );
}
