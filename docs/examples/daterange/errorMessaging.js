// @flow strict
import { type Node as ReactNode, useEffect, useState } from 'react';
import { Flex } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example(): ReactNode {
  const date = new Date();
  const year = date.getFullYear();

  const minDate = new Date(year, 6, 1);
  const maxDate = new Date(year, 6, 31);

  const [startDate, setStartDate] = useState<Date | null>(new Date(year, 5, 1));
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentEndErrorMessage, setCurrentEndErrorMessage] = useState<
    [string | null, Date | null] | null,
  >(null);
  const [currentStartErrorMessage, setCurrentStartErrorMessage] = useState<
    [string | null, Date | null] | null,
  >(null);
  const [endErrorMessage, setEndErrorMessage] = useState<string | null>(null);
  const [startErrorMessage, setStartErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (currentStartErrorMessage && currentStartErrorMessage[0]) {
      setStartErrorMessage('Select a valid date in July');
    }
  }, [year, currentStartErrorMessage, startDate]);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <DateRange
        endDateErrorMessage={endErrorMessage}
        endDateValue={endDate}
        maxDate={maxDate}
        minDate={minDate}
        onCancel={() => {}}
        onEndDateBlur={() => {
          if (currentEndErrorMessage && currentEndErrorMessage[0]) {
            setEndErrorMessage('Select a valid date in July');
          } else {
            setEndErrorMessage(null);
          }
        }}
        onEndDateChange={({ value }) => setEndDate(value)}
        onEndDateError={({ errorMessage, value }) => {
          if (!errorMessage) {
            setEndErrorMessage(null);
          }
          setCurrentEndErrorMessage([errorMessage, value]);
        }}
        onStartDateBlur={() => {
          if (currentStartErrorMessage && currentStartErrorMessage[0]) {
            setStartErrorMessage('Select a valid date in July');
          } else {
            setStartErrorMessage(null);
          }
        }}
        onStartDateChange={({ value }) => setStartDate(value)}
        onStartDateError={({ errorMessage, value }) => {
          if (!errorMessage) {
            setStartErrorMessage(null);
          }
          setCurrentStartErrorMessage([errorMessage, value]);
        }}
        onSubmit={() => {}}
        startDateErrorMessage={startErrorMessage}
        startDateValue={startDate}
      />
    </Flex>
  );
}
