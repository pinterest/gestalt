// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Heading, SegmentedControl } from 'gestalt';

export default function SegmentedControlExample(): Node {
  const [item1Index, setItem1Index] = useState(0);
  const [item2Index, setItem2Index] = useState(0);
  const items = ['Short', 'Really really really long title'];

  return (
    <Box padding={8}>
      <Flex direction="column" gap={{ column: 6, row: 0 }}>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="400">Equal widths</Heading>
          <SegmentedControl
            items={items}
            onChange={({ activeIndex }) => {
              setItem1Index(activeIndex);
            }}
            selectedItemIndex={item1Index}
          />
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="400">Responsive widths</Heading>
          <SegmentedControl
            items={items}
            onChange={({ activeIndex }) => {
              setItem2Index(activeIndex);
            }}
            responsive
            selectedItemIndex={item2Index}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
