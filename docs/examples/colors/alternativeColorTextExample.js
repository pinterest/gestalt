// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Text } from 'gestalt';

export default function AlternativeColorTextExample(): Node {
  return (
    <Flex
      gap={{
        row: 1,
        column: 0,
      }}
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Icon icon="eye" accessibilityLabel="views" />
      <Text weight="bold">
        <Box
          dangerouslySetInlineStyle={{
            __style: { color: 'darkmagenta' },
          }}
        >
          views
        </Box>
      </Text>
    </Flex>
  );
}
