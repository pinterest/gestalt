import { Box, List, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <List label={<Text weight="bold">Bare list</Text>} type="bare">
        <List.Item text="List item text" />
        <List.Item text="List item text" />
        <List.Item text="List item text" />
        <List.Item text="List item text" />
      </List>
    </Box>
  );
}
