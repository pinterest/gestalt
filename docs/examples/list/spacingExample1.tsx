import { ReactNode } from 'react';
import { Box, List, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <List
        label={<Text weight="bold">Condensed spacing</Text>}
        spacing="condensed"
        type="unordered"
      >
        <List.Item text="List item text" />
        {/* @ts-expect-error - TS2746 - This JSX tag's 'children' prop expects a single child of type '((string | ReactElement<FunctionComponent<PropsWithChildren<ListProps>> & ListSubComponents, string | JSXElementConstructor<...>> | ReactElement<...>) & (string | ... 5 more ... | null)) | undefined', but multiple children were provided. */}
        <List.Item text="List item text">
          {/* @ts-expect-error - TS2746 - This JSX tag's 'children' prop expects a single child of type '((string | ReactElement<FunctionComponent<PropsWithChildren<ListProps>> & ListSubComponents, string | JSXElementConstructor<...>> | ReactElement<...>) & (string | ... 5 more ... | null)) | undefined', but multiple children were provided. */}
          <List.Item text="List item text">
            <List.Item text="List item text" />
            <List.Item text="List item text" />
            <List.Item text="List item text" />
          </List.Item>
          <List.Item text="List item text" />
          <List.Item text="List item text" />
        </List.Item>
        <List.Item text="List item text" />
      </List>
    </Box>
  );
}
