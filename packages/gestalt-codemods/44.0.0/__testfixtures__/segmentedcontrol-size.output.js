// @flow strict
import { useState } from 'react';
import { Box, Flex, Icon, SegmentedControl, Text } from 'gestalt';

export default function SegmentedControlExample() {
  const [itemIndex, setItemIndex] = useState(0);

  const items = [
    'News',
    'You',
    'Messages',
    <Icon
      accessibilityLabel="Pin"
      color="darkGray"
      key="foo"
      icon="pin"
    />,
  ];

  const content = [
    'News content',
    'You content',
    'Messages content',
    'Pins content',
  ];

  return (
    <Flex direction="column" gap={2}>
      <SegmentedControl
        items={items}
        onChange={({ activeIndex }) => setItemIndex(activeIndex)}
        selectedItemIndex={itemIndex} />

      <Box borderStyle="shadow" padding={6} rounding={2}>
        <Text>{content[itemIndex]}</Text>
      </Box>
    </Flex>
  );
}
