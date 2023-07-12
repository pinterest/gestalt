// @flow strict
import { type Node, useState } from 'react';
import { DateRange } from 'gestalt-datepicker';

export default function Example(): Node {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endErrorMessage, setEndErrorMessage] = useState<string | null>(null);
  const [startErrorMessage, setStartErrorMessage] = useState<string | null>(null);

  const dateValue = new Date();
  const maxDate = new Date(dateValue.setDate(dateValue.getDate() + 10));

  return (
    <DateRange
      endDateValue={endDate}
      endDateErrorMessage={endErrorMessage}
      minDate={new Date()}
      maxDate={maxDate}
      onStartDateChange={({ value }) => setStartDate(value)}
      onEndDateChange={({ value }) => setEndDate(value)}
      onStartDateError={({ errorMessage }) =>
        setStartErrorMessage(errorMessage ? 'Please, enter a valid date' : null)
      }
      onEndDateError={({ errorMessage }) =>
        setEndErrorMessage(errorMessage ? 'Please, enter a valid date' : null)
      }
      startDateValue={startDate}
      startDateErrorMessage={startErrorMessage}
      onSubmit={() => {}}
      onCancel={() => {}}
    />
  );
}
