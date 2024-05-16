import { ReactNode, useRef, useState } from 'react';
import { Box, Flex, IconButton, Layer, Popover, Status } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example() {
  const [selectedDates, setSelectedDates] = useState<[Date, Date] | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showComponent, setShowComponent] = useState(true);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <Flex alignContent="start" height="100%" justifyContent="start" width="100%">
      <Box padding={8}>
        <Flex alignItems="center" gap={2}>
          <Status
            subtext={
              selectedDates
                ? `${
                    selectedDates[0].getMonth() + 1
                  }/${selectedDates[0].getDate()}/${selectedDates[0].getFullYear()} - ${
                    selectedDates[1].getMonth() + 1
                  }/${selectedDates[1].getDate()}/${selectedDates[1].getFullYear()}`
                : undefined
            }
            title={selectedDates ? 'Campaign dates selected' : 'Select dates'}
            type={selectedDates ? 'ok' : 'problem'}
          />
          <IconButton
            ref={anchorRef}
            accessibilityLabel="Open calendar"
            icon="edit"
            onClick={() => {
              if (!showComponent && selectedDates) {
                setStartDate(selectedDates[0]);
                setEndDate(selectedDates[1]);
              }

              setShowComponent((value) => !value);
            }}
            selected={showComponent}
          />
        </Flex>
      </Box>

      {showComponent ? (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size="flexible"
          >
            <DateRange
              endDateValue={endDate}
              onCancel={() => {
                setStartDate(null);
                setEndDate(null);
                setShowComponent(false);
              }}
              onEndDateChange={({ value }) => setEndDate(value)}
              onEndDateError={() => {}}
              onStartDateChange={({ value }) => setStartDate(value)}
              onStartDateError={() => {}}
              onSubmit={() => {
                if (startDate && endDate) setSelectedDates([startDate, endDate]);
                setShowComponent(false);
              }}
              startDateValue={startDate}
            />
          </Popover>
        </Layer>
      ) : null}
    </Flex>
  );
}
