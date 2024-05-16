import { ReactNode, useState } from 'react';
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
        {/* @ts-expect-error - TS2746 - This JSX tag's 'children' prop expects a single child of type '((string | ReactElement<FunctionComponent<PropsWithChildren<ListProps>> & ListSubComponents, string | JSXElementConstructor<...>> | ReactElement<...>) & (string | ... 5 more ... | null)) | undefined', but multiple children were provided. */}
        <List.Item text="List item text">
          <List.Item text="List item text" />
          <List.Item text={<Text>List Item text</Text>} />
        </List.Item>
        <List.Item text="List item text" />
      </List>
      <Box paddingY={8} width="500px">
        {/* @ts-expect-error - TS2741 - Property 'size' is missing in type '{ items: string[]; onChange: ({ activeIndex }: { activeIndex: number; } & { readonly event: MouseEvent<HTMLButtonElement, MouseEvent>; }) => void; selectedItemIndex: number; }' but required in type 'SegmentedControlProps'. */}
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
