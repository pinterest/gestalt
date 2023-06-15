// @flow strict
import { type Node, useState } from 'react';
import { Box, Icon, SegmentedControl, Text } from 'gestalt';

export default function Example(): Node {
  const [itemIndex, setItemIndex] = useState(0);
  const items = [
    'News',
    'You',
    'Messages',
    <Icon key="pin-icon" icon="pin" accessibilityLabel="Pin" color="default" />,
  ];
  const content = ['News content', 'You content', 'Messages content', 'Pins content'];
  return (
    <Box padding={4} height="100%">
      <SegmentedControl
        items={items}
        selectedItemIndex={itemIndex}
        onChange={({ activeIndex }) => setItemIndex(activeIndex)}
      />

      <Box borderStyle="sm" marginTop={2} padding={6} rounding={2} height="80%">
        <Text>{content[itemIndex]}</Text>
      </Box>
    </Box>
  );
}
