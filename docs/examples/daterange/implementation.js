// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, Flex, IconButton, Layer, Popover, Status } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example(): Node {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showComponent, setShowComponent] = useState(true);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <Flex width="100%" height="100%" alignContent="start" justifyContent="start">
      <Box padding={8}>
        <Flex gap={2} alignItems="center">
          <Status
            type={!showComponent && startDate && endDate ? 'ok' : 'problem'}
            title={
              !showComponent && startDate && endDate ? 'Campaign dates selected' : 'Select dates'
            }
            subtext={
              !showComponent && startDate && endDate
                ? `${startDate.getMonth()}/${startDate.getDay()}/${startDate.getFullYear()} - ${endDate.getMonth()}/${endDate.getDay()}/${endDate.getFullYear()}`
                : undefined
            }
          />
          <IconButton
            accessibilityLabel="Open calendar"
            icon="edit"
            selected={showComponent}
            onClick={() => setShowComponent((value) => !value)}
            ref={anchorRef}
          />
        </Flex>
      </Box>

      {showComponent ? (
        <Layer>
          <Popover
            size="flexible"
            positionRelativeToAnchor={false}
            onDismiss={() => {}}
            anchor={anchorRef.current}
            idealDirection="down"
          >
            <DateRange
              endDateValue={endDate}
              onEndDateChange={({ value }) => setEndDate(value)}
              onEndDateError={() => {}}
              onStartDateError={() => {}}
              onStartDateChange={({ value }) => setStartDate(value)}
              onSubmit={() => setShowComponent(false)}
              startDateValue={startDate}
            />
          </Popover>
        </Layer>
      ) : null}
    </Flex>
  );
}
