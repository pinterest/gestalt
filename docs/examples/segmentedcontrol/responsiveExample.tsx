import { ReactNode, useState } from 'react';
import { Box, Flex, Heading, SegmentedControl } from 'gestalt';

export default function SegmentedControlExample() {
  const [item1Index, setItem1Index] = useState(0);
  const [item2Index, setItem2Index] = useState(0);
  const items = ['Short', 'Really really really long title'];

  return (
    <Box padding={8}>
      <Flex direction="column" gap={{ column: 6, row: 0 }}>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="400">Equal widths</Heading>
          {/* @ts-expect-error - TS2741 - Property 'size' is missing in type '{ items: string[]; onChange: ({ activeIndex }: { activeIndex: number; } & { readonly event: MouseEvent<HTMLButtonElement, MouseEvent>; }) => void; selectedItemIndex: number; }' but required in type 'SegmentedControlProps'. */}
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
          {/* @ts-expect-error - TS2741 - Property 'size' is missing in type '{ items: string[]; onChange: ({ activeIndex }: { activeIndex: number; } & { readonly event: MouseEvent<HTMLButtonElement, MouseEvent>; }) => void; responsive: true; selectedItemIndex: number; }' but required in type 'SegmentedControlProps'. */}
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
