import { ReactNode } from 'react';
import { Box, List, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <List label={<Text weight="bold">Mixed nested</Text>} spacing="condensed" type="ordered">
        <List.Item text="List item text" />
        <List.Item text="List item text">
          <List type="unordered">
            <List.Item text="List item text" />
            <List.Item text="List item text">
              <List.Item text="List item text" />
              <List.Item text="List item text">
                <List type="ordered">
                  <List.Item text="List item text" />
                  <List.Item text="List item text" />
                </List>
              </List.Item>
            </List.Item>
            <List.Item text="List item text" />
          </List>
        </List.Item>
        <List.Item text="List item text" />
      </List>
    </Box>
  );
}
