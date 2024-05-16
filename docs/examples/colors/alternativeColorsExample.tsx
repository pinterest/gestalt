import {ReactNode} from 'react';
import { Box, Flex, Icon, Text } from 'gestalt';

export default function AlternativeColorsExample() {
  return (
    <Flex
      alignItems="center"
      gap={{
        row: 2,
        column: 0,
      }}
      height="100%"
      justifyContent="center"
    >
      <Box
        dangerouslySetInlineStyle={{
          __style: { backgroundColor: 'gold' },
        }}
        padding={3}
        rounding="pill"
      >
        <Text weight="bold">Button</Text>
      </Box>
      <Box
        dangerouslySetInlineStyle={{
          __style: { backgroundColor: 'green' },
        }}
        padding={3}
        rounding="circle"
      >
        <Icon accessibilityLabel="Create" color="inverse" icon="add" />
      </Box>
    </Flex>
  );
}
