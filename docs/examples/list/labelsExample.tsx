import { Box, Flex, Heading, List } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={4}>
        <Heading accessibilityLevel="none" size="600">
          Asynchronous Analytics Endpoints
        </Heading>
        <List
          label="Use the synchronous analytics endpoints if:"
          labelDisplay="hidden"
          type="unordered"
        >
          <List.Item text="You need data from the last 90 days" />
          <List.Item text="You want a quick response to load a user facing dashboard/component in real time" />
          <List.Item text="You want to avoid large report size/unnecessary data being returned" />
          <List.Item text="You need only basic key metrics for each campaign/ad/etc" />
        </List>
      </Flex>
    </Box>
  );
}
