// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): Node {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const endDateInput = useRef<null | HTMLInputElement>(null);
  const startDateInput = useRef<null | HTMLInputElement>(null);

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={2}>
        <Flex gap={{ column: 0, row: 2 }}>
          <DatePicker
            rangeStartDate={startDate}
            rangeEndDate={endDate}
            id="example-start-date"
            label="Check In"
            nextRef={endDateInput}
            onChange={({ value }) => {
              setStartDate(value);
            }}
            rangeSelector="start"
            value={startDate}
            ref={startDateInput}
          />
          <DatePicker
            rangeStartDate={startDate}
            rangeEndDate={endDate}
            id="example-end-date"
            label="Check Out"
            nextRef={startDateInput}
            onChange={({ value }) => setEndDate(value)}
            rangeSelector="end"
            value={endDate}
            ref={endDateInput}
          />
        </Flex>
      </Box>
    </Flex>
  );
}
