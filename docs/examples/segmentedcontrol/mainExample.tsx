import { ReactNode, useState } from 'react';
import { Box, Icon, SegmentedControl, Text } from 'gestalt';

export default function Example() {
  const [itemIndex, setItemIndex] = useState(0);
  const items = [
    'News',
    'You',
    'Messages',
    <Icon key="pin-icon" accessibilityLabel="Pin" color="default" icon="pin" />,
  ];
  const content = ['News content', 'You content', 'Messages content', 'Pins content'];
  return (
    <Box height="100%" padding={4}>
      {/* @ts-expect-error - TS2741 - Property 'size' is missing in type '{ items: (string | Element)[]; onChange: ({ activeIndex }: { activeIndex: number; } & { readonly event: MouseEvent<HTMLButtonElement, MouseEvent>; }) => void; selectedItemIndex: number; }' but required in type 'SegmentedControlProps'. */}
      <SegmentedControl
        items={items}
        onChange={({ activeIndex }) => setItemIndex(activeIndex)}
        selectedItemIndex={itemIndex}
      />

      <Box borderStyle="sm" height="80%" marginTop={2} padding={6} rounding={2}>
        <Text>{content[itemIndex]}</Text>
      </Box>
    </Box>
  );
}
