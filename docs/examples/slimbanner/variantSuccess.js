// @flow strict
import { type Node } from 'react';
import { Box, Flex, SlimBanner } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <SlimBanner
          type="success"
          iconAccessibilityLabel="Info"
          message="Your ads are doing great! Keep it up by using recommendations to optimize your ad spend."
        />
        <SlimBanner
          type="successBare"
          iconAccessibilityLabel="Info"
          message="Your ads are doing great! Keep it up by using recommendations to optimize your ad spend."
        />
      </Flex>
    </Box>
  );
}
