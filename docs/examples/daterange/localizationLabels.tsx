import { useState } from 'react';
import { DefaultLabelProvider, Flex } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <DefaultLabelProvider
    // @ts-expect-error - TS2322 - Type '{ DateRange: { cancelText: string; applyText: string; }; }' is not assignable to type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }'.
      labels={{
        DateRange: {
          cancelText: 'Abbrechen',
          applyText: 'Anwenden',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <DateRange
          endDateValue={endDate}
          onCancel={() => {}}
          onEndDateChange={({ value }) => setEndDate(value)}
          onEndDateError={() => {}}
          onStartDateChange={({ value }) => setStartDate(value)}
          onStartDateError={() => {}}
          onSubmit={() => {}}
          startDateValue={startDate}
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
