import { Box, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={{ column: 3, row: 0 }}>
        <Text color="default" size="400">
          Default
        </Text>
        <Text color="subtle" size="400">
          Subtle
        </Text>
        <Box color="inverse" padding={1}>
          <Text color="inverse" size="400">
            Inverse
          </Text>
        </Box>
        <Text color="disabled" size="400">
          Disabled
        </Text>
        <Text color="error" size="400">
          Error
        </Text>
        <Text color="success" size="400">
          Success
        </Text>
        <Text color="warning" size="400">
          Warning
        </Text>
        <Text color="recommendation" size="400">
          Recommendation
        </Text>
        <Text color="link" size="400">
          Link
        </Text>
        <Text color="shopping" size="400">
          Shopping
        </Text>
        <Box color="primary" padding={1}>
          <Text color="light" size="400">
            Light
          </Text>
        </Box>
        <Box color="infoWeak" padding={1}>
          <Text color="dark" size="400">
            Dark
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
