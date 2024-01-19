// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, List, SegmentedControl, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const items = ['100', '200', '300', '400', '500', '600'];
  return (
    <Box
      padding={8}
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap={6}
    >
      <List type="ordered" size={items[selectedItemIndex]}>
        <List.Item text="List item text" />
        <List.Item text="List item text">
          <List.Item text="List item text" />
          <List.Item text={<Text>List Item text</Text>} />
        </List.Item>
        <List.Item text="List item text" />
      </List>
      <Box width="500px" paddingY={8}>
        <SegmentedControl
          items={items}
          selectedItemIndex={selectedItemIndex}
          onChange={({ activeIndex }) => {
            setSelectedItemIndex(activeIndex);
          }}
        />
      </Box>
    </Box>
  );
}
