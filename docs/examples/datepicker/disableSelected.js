// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): ReactNode {
  const [dateValue, setDateValue] = useState<Date | null>(new Date(2020, 2, 9));

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={4}>
        <DatePicker
          id="disableSelecxted"
          label="Select Your Appointment"
          helperText="Enter an activation date for your campaign"
          onChange={({ value }) => setDateValue(value)}
          name="bday_datefield"
          minDate={new Date()}
          excludeDates={[new Date(2020, 2, 11), new Date(2020, 2, 12)]}
          value={dateValue}
        />
      </Box>
    </Flex>
  );
}
