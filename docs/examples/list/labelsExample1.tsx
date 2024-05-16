import {ReactNode} from 'react';
import { Box, Flex, List, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={4}>
        <Text>
          The Save button is one of the best ways to get your content onto Pinterest —through
          visitors to your site. Make sure your Save button is doing the most for you by following
          our best practices.
        </Text>
        <List
          label="Best practices for Save Button for developers"
          labelDisplay="hidden"
          type="unordered"
        >
          <List.Item text="Pin type settings: Include 'pinit.js' correctly" />
          <List.Item text="Use the Save button that’s best for your website" />
          <List.Item text="Multiple images on a page (like a blog)" />
        </List>
      </Flex>
    </Box>
  );
}
