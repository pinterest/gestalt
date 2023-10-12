// @flow strict
import { type Node, useState } from 'react';
import { Box, ColorSchemeProvider, Flex, Heading, SegmentedControl } from 'gestalt';

export default function Snapshot(): Node {
  const [item1Index, setItem1Index] = useState(0);
  const [item2Index, setItem2Index] = useState(0);
  const [item3Index, setItem3Index] = useState(0);
  const items = ['Small', 'Medium', 'Large'];

  return (
    <ColorSchemeProvider colorScheme="light">
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
                size="sm"
                selectedItemIndex={item1Index}
              />
            </Flex>

            <Flex direction="column" gap={{ column: 2, row: 0 }}>
              <Heading size="300">md</Heading>
              <SegmentedControl
                items={items}
                onChange={({ activeIndex }) => {
                  setItem2Index(activeIndex);
                }}
                size="md"
                responsive
                selectedItemIndex={item2Index}
              />
            </Flex>
            <Flex direction="column" gap={{ column: 2, row: 0 }}>
              <Heading size="300">lg</Heading>
              <SegmentedControl
                items={items}
                onChange={({ activeIndex }) => {
                  setItem3Index(activeIndex);
                }}
                size="lg"
                responsive
                selectedItemIndex={item3Index}
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </ColorSchemeProvider>
  );
}
