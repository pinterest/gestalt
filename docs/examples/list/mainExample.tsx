import { ReactNode } from 'react';
import { Box, List } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <List label="This application will be able to" type="unordered">
        <List.Item text="Access your follows and followers" />
        <List.Item text="Create new Pins for you" />
        <List.Item text="Follow things for you" />
      </List>
    </Box>
  );
}
