// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, BannerSlim } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <BannerSlim
          type="success"
          iconAccessibilityLabel="Info"
          message="Your ads are doing great! Keep it up by using recommendations to optimize your ad spend."
        />
        <BannerSlim
          type="successBare"
          iconAccessibilityLabel="Info"
          message="Your ads are doing great! Keep it up by using recommendations to optimize your ad spend."
        />
      </Flex>
    </Box>
  );
}
