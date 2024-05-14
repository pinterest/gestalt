import { useState } from 'react';
import { Box, Flex, Heading, SegmentedControl } from 'gestalt';

export default function SegmentedControlSnapshot() {
  const [item1Index, setItem1Index] = useState(0);
  const [item2Index, setItem2Index] = useState(0);
  const [item3Index, setItem3Index] = useState(0);
  const items = ['Small', 'Medium', 'Large'];

  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <Box padding={8}>
        <Flex direction="column" gap={{ column: 6, row: 0 }}>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Heading size="300">sm</Heading>
            <SegmentedControl
              items={items}
              onChange={({ activeIndex }) => {
                setItem1Index(activeIndex);
              }}
              selectedItemIndex={item1Index}
              size="sm"
            />
          </Flex>

          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Heading size="300">md</Heading>
            <SegmentedControl
              items={items}
              onChange={({ activeIndex }) => {
                setItem2Index(activeIndex);
              }}
              responsive
              selectedItemIndex={item2Index}
              size="md"
            />
          </Flex>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Heading size="300">lg</Heading>
            <SegmentedControl
              items={items}
              onChange={({ activeIndex }) => {
                setItem3Index(activeIndex);
              }}
              responsive
              selectedItemIndex={item3Index}
              size="lg"
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
