// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, SegmentedControl } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): ReactNode {
  const mapOptions = { '0': ['month'], '1': ['year'], '2': ['year', 'month'] };
  const items = ['Month', 'Year', 'Month & Year'];
  const [itemIndex, setItemIndex] = useState(0);
  const [dateValue, setDateValue] = useState<Date | null>(new Date(1985, 6, 4));

  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={2}>
        <Flex direction="column" gap={4} width="100%">
          <SegmentedControl
            items={items}
            onChange={({ activeIndex }) => setItemIndex(activeIndex)}
            selectedItemIndex={itemIndex}
          />
          <DatePicker
            id="selectLists"
            label="Alberto's birth date"
            onChange={({ value }) => setDateValue(value)}
            selectLists={mapOptions[itemIndex.toString()]}
            value={dateValue}
          />
        </Flex>
      </Box>
    </Flex>
  );
}
