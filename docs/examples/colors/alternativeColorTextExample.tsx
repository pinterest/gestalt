import { ReactNode } from 'react';
import { Box, Flex, Icon, Text } from 'gestalt';

export default function AlternativeColorTextExample() {
  return (
    <Flex
      alignItems="center"
      gap={{
        row: 1,
        column: 0,
      }}
      height="100%"
      justifyContent="center"
    >
      <Icon accessibilityLabel="views" icon="eye" />
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
