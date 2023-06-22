// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Text } from 'gestalt';

export default function AlternativeColorsExample(): Node {
  return (
    <Flex
      gap={{
        row: 2,
        column: 0,
      }}
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box
        dangerouslySetInlineStyle={{
          __style: { backgroundColor: 'gold' },
        }}
        rounding="pill"
        padding={3}
      >
        <Text weight="bold">Button</Text>
      </Box>
      <Box
        dangerouslySetInlineStyle={{
          __style: { backgroundColor: 'green' },
        }}
        rounding="circle"
        padding={3}
      >
        <Icon icon="add" color="inverse" accessibilityLabel="Create" />
      </Box>
    </Flex>
  );
}
