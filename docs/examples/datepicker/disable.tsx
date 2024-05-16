import {ReactNode, useState} from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  const [dateValueDisableFuture, setDateValueDisableFuture] = useState<Date | null>(null);
  const [dateValueDisablePast, setDatealueDisablePast] = useState<Date | null>(null);

  return (
    <Flex alignItems="start" gap={4} height="100%" justifyContent="center" width="100%">
      <Box padding={4}>
        <DatePicker
          helperText="Enter your date of birth"
          id="disableFuture"
          label="Date of birth"
          maxDate={new Date()}
          onChange={({ value }) => setDateValueDisableFuture(value)}
          value={dateValueDisableFuture}
        />
      </Box>
      <Box padding={4}>
        <DatePicker
          helperText="Enter an activation date for your campaign"
          id="disablePast"
          label="Campaign activation date"
          minDate={new Date()}
          name="bday_datefield"
          onChange={({ value }) => setDatealueDisablePast(value)}
          value={dateValueDisablePast}
        />
      </Box>
    </Flex>
  );
}
