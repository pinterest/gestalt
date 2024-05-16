import {ReactNode, useState} from 'react';
import { Box, Flex, Icon, SegmentedControl, Text } from 'gestalt';

export default function SegmentedControlExample() {
  const [itemIndex, setItemIndex] = useState(0);

  const items = [
    'News',
    'You',
    'Messages',
    <Icon key="icon" accessibilityLabel="Pin" color="default" icon="pin" />,
  ];

  const content = ['News content', 'You content', 'Messages content', 'Pins content'];

  return (
    <Box height="100%" padding={8}>
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <SegmentedControl
          items={items}
          onChange={({ activeIndex }) => setItemIndex(activeIndex)}
          selectedItemIndex={itemIndex}
        />

        <Box borderStyle="shadow" padding={6} rounding={2}>
          <Text>{content[itemIndex]}</Text>
        </Box>
      </Flex>
    </Box>
  );
}
