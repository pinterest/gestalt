// @flow strict
import { type Node } from 'react';
import { Box, Flex, SlimBanner, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" width="100%" gap={{ column: 6, row: 0 }}>
        <Text weight="bold" size="500">
          Ads overview
        </Text>
        <SlimBanner
          type="error"
          message="There is an issue with your billing account so all ads currently paused."
          iconAccessibilityLabel="Error"
        />
      </Flex>
    </Box>
  );
}
