// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Icon, SegmentedControl, Text } from 'gestalt';

export default function SegmentedControlExample(): Node {
  const [itemIndex, setItemIndex] = useState(0);

  const items = [
    'News',
    'You',
    'Messages',
    <Icon key="icon" icon="pin" accessibilityLabel="Pin" color="default" />,
  ];

  const content = ['News content', 'You content', 'Messages content', 'Pins content'];

  return (
    <Box padding={8} height="100%">
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <SegmentedControl
          items={items}
          selectedItemIndex={itemIndex}
          onChange={({ activeIndex }) => setItemIndex(activeIndex)}
        />

        <Box borderStyle="shadow" padding={6} rounding={2}>
          <Text>{content[itemIndex]}</Text>
        </Box>
      </Flex>
    </Box>
  );
}
