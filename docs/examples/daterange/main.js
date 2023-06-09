// @flow strict
import { useState, type Node } from 'react';
import { DateRange } from 'gestalt-datepicker';

export default function Example(): Node {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <DateRange
      startDateValue={startDate}
      endDateValue={endDate}
      onStartDateChange={({ value }) => setStartDate(value)}
      onEndDateChange={({ value }) => setEndDate(value)}
    />
  );
}
