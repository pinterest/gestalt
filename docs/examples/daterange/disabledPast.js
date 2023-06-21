// @flow strict
import { type Node, useState } from 'react';
import { DateRange } from 'gestalt-datepicker';

export default function Example(): Node {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startErrorMessage, setStartErrorMessage] = useState<string | null>(null);

  return (
    <DateRange
      endDateValue={endDate}
      maxDate={new Date()}
      onStartDateChange={({ value }) => setStartDate(value)}
      onEndDateChange={({ value }) => setEndDate(value)}
      onStartDateError={({ errorMessage }) => setStartErrorMessage(errorMessage)}
      onEndDateError={() => {}}
      startDateErrorMessage={startErrorMessage}
      startDateValue={startDate}
    />
  );
}
