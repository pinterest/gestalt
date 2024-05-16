import { Box, Flex, Heading } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Heading accessibilityLevel={2} size="500">
          Medium heading level 2
        </Heading>
        <Heading accessibilityLevel={3} size="400">
          Small heading level 3
        </Heading>
        <Heading accessibilityLevel="none" size="400">
          Small heading without a level
        </Heading>
      </Flex>
    </Box>
  );
}
