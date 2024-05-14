import { Box, Flex, Icon, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
        <Icon accessibilityLabel="sparkle" color="default" icon="sparkle" size={16} />
        <Text>Recommendation text</Text>
      </Flex>
    </Box>
  );
}
