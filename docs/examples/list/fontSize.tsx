import { useState } from 'react';
import { Box, List, SegmentedControl, Text } from 'gestalt';

export default function Example() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const items = ['100', '200', '300', '400', '500', '600'];
  return (
    <Box
      alignItems="center"
      direction="column"
      display="flex"
      // @ts-expect-error - TS2322 - Type '{ children: Element[]; alignItems: "center"; direction: "column"; display: "flex"; gap: number; height: string; justifyContent: "center"; padding: 8; }' is not assignable to type 'IntrinsicAttributes & Omit<BoxProps, "ref"> & RefAttributes<HTMLDivElement>'.
      gap={6}
      height="100%"
      justifyContent="center"
      padding={8}
    >
      {/* @ts-expect-error - TS2322 - Type '{ children: Element[]; size: string; type: "ordered"; }' is not assignable to type 'IntrinsicAttributes & ListProps & { children?: ReactNode; }'. */}
      <List size={items[selectedItemIndex]} type="ordered">
        <List.Item text="List item text" />

        <List.Item text="List item text">
          <List.Item text="List item text" />
          <List.Item text={<Text>List Item text</Text>} />
        </List.Item>
        <List.Item text="List item text" />
      </List>
      <Box paddingY={8} width="500px">
        <SegmentedControl
          items={items}
          onChange={({ activeIndex }) => {
            setSelectedItemIndex(activeIndex);
          }}
          selectedItemIndex={selectedItemIndex}
        />
      </Box>
    </Box>
  );
}
