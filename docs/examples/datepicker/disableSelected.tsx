import { ReactNode, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  const [dateValue, setDateValue] = useState<Date | null>(new Date(2020, 2, 9));

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={4}>
        <DatePicker
          excludeDates={[new Date(2020, 2, 11), new Date(2020, 2, 12)]}
          helperText="Enter an activation date for your campaign"
          id="disableSelecxted"
          label="Select Your Appointment"
          minDate={new Date()}
          name="bday_datefield"
          onChange={({ value }) => setDateValue(value)}
          value={dateValue}
        />
      </Box>
    </Flex>
  );
}
