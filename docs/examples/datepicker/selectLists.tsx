import { ReactNode, useState } from 'react';
import { Box, Flex, SegmentedControl } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  const mapOptions = { '0': ['month'], '1': ['year'], '2': ['year', 'month'] } as const;
  const items = ['Month', 'Year', 'Month & Year'];
  const [itemIndex, setItemIndex] = useState(0);
  const [dateValue, setDateValue] = useState<Date | null>(new Date(1985, 6, 4));

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={2}>
        <Flex direction="column" gap={4} width="100%">
          {/* @ts-expect-error - TS2741 - Property 'size' is missing in type '{ items: string[]; onChange: ({ activeIndex }: { activeIndex: number; } & { readonly event: MouseEvent<HTMLButtonElement, MouseEvent>; }) => void; selectedItemIndex: number; }' but required in type 'SegmentedControlProps'. */}
          <SegmentedControl
            items={items}
            onChange={({ activeIndex }) => setItemIndex(activeIndex)}
            selectedItemIndex={itemIndex}
          />
          <DatePicker
            id="selectLists"
            label="Alberto's birth date"
            onChange={({ value }) => setDateValue(value)}
            // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly '0': readonly ["month"]; readonly '1': readonly ["year"]; readonly '2': readonly ["year", "month"]; }'.
            selectLists={mapOptions[itemIndex.toString()]}
            value={dateValue}
          />
        </Flex>
      </Box>
    </Flex>
  );
}
