// @flow strict
import { useState, type Node } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): Node {
  const [dateValueDisableFuture, setDateValueDisableFuture] = useState<void | Date>(undefined);
  const [dateValueDisablePast, setDatealueDisablePast] = useState<void | Date>(undefined);

  return (
    <Flex alignItems="start" gap={4} height="100%" justifyContent="center" width="100%">
      <Box padding={4}>
        <DatePicker
          id="disableFuture"
          label="Date of birth"
          helperText="Enter your date of birth"
          onChange={({ value }) => setDateValueDisableFuture(value)}
          value={dateValueDisableFuture}
          maxDate={new Date()}
        />
      </Box>
      <Box padding={4}>
        <DatePicker
          id="disablePast"
          label="Campaign activation date"
          helperText="Enter an activation date for your campaign"
          onChange={({ value }) => setDatealueDisablePast(value)}
          value={dateValueDisablePast}
          name="bday_datefield"
          minDate={new Date()}
        />
      </Box>
    </Flex>
  );
}
