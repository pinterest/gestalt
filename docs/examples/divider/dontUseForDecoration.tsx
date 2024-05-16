import { Box, Divider, Flex, Heading, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex width="80%">
        <Box paddingX={4}>
          <Heading accessibilityLevel="none" size="400">
            Our mission
          </Heading>
        </Box>
        <Divider />
        <Box paddingX={4}>
          <Text size="200">
            Pinterest&apos;s mission is to bring everyone the inspiration to create a life they
            love.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
