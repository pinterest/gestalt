// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, SlimBanner } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <SlimBanner
          type="recommendation"
          iconAccessibilityLabel="Recommendation"
          message="Advertise with confidence! When you run ads on Pinterest, you'll find recommendations to improve them here."
        />
        <SlimBanner
          type="recommendationBare"
          iconAccessibilityLabel="Recommendation"
          message="Advertise with confidence! When you run ads on Pinterest, you'll find recommendations to improve them here."
        />
      </Flex>
    </Box>
  );
}
