import { useEffect, useState } from 'react';
import { DeviceTypeProvider, Flex } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example() {
  const year = new Date().getFullYear();
  const startDate = new Date(year, 5, 30);
  const endDate = null;
  const secondaryStartDate = new Date(year, 7, 20);
  const secondaryEndDate = new Date(year, 7, 21);

  const minDate = new Date(year, 6, 1);
  const maxDate = new Date(year, 6, 20);

  const startDateError = 'Select a date after June 1st';
  const endDateError = 'Select a date before June 20th';

  const [primaryErrorMessage, setPrimaryErrorMessage] = useState<string | null>(null);
  const [secondaryErrorMessage, setSecondaryErrorMessage] = useState<string | null>(null);
  const [startErrorMessage, setStartErrorMessage] = useState<string | null>(null);
  const [endErrorMessage, setEndErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (primaryErrorMessage) {
      setStartErrorMessage(startDateError);
    }
    if (secondaryErrorMessage) {
      setEndErrorMessage(endDateError);
    }
  }, [primaryErrorMessage, secondaryErrorMessage]);

  return (
    <DeviceTypeProvider deviceType="desktop">
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <DateRange
          dateErrorMessage={{ startDate: startErrorMessage, endDate: null }}
          dateValue={{ startDate, endDate }}
          maxDate={maxDate}
          minDate={minDate}
          onCancel={() => {}}
          onDateChange={() => {}}
          onDateError={{
            startDate: ({ errorMessage }) => {
              setPrimaryErrorMessage(errorMessage);
            },
            endDate: () => {},
          }}
          onSecondaryDateChange={() => {}}
          onSecondaryDateError={{
            startDate: () => {},
            endDate: ({ errorMessage }) => {
              setSecondaryErrorMessage(errorMessage);
            },
          }}
          onSubmit={() => {}}
          secondaryDateErrorMessage={{
            startDate: null,
            endDate: endErrorMessage,
          }}
          secondaryDateValue={{ startDate: secondaryStartDate, endDate: secondaryEndDate }}
        />
      </Flex>
    </DeviceTypeProvider>
  );
}
