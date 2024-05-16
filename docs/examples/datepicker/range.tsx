import {ReactNode, useRef, useState} from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const endDateInput = useRef<null | HTMLInputElement>(null);
  const startDateInput = useRef<null | HTMLInputElement>(null);

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={2}>
        <Flex gap={{ column: 0, row: 2 }}>
          <DatePicker
            ref={startDateInput}
            id="example-start-date"
            label="Check In"
            nextRef={endDateInput}
            onChange={({ value }) => {
              setStartDate(value);
            }}
            rangeEndDate={endDate}
            rangeSelector="start"
            rangeStartDate={startDate}
            value={startDate}
          />
          <DatePicker
            ref={endDateInput}
            id="example-end-date"
            label="Check Out"
            nextRef={startDateInput}
            onChange={({ value }) => setEndDate(value)}
            rangeEndDate={endDate}
            rangeSelector="end"
            rangeStartDate={startDate}
            value={endDate}
          />
        </Flex>
      </Box>
    </Flex>
  );
}
