// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, BannerSlim } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <BannerSlim
          type="info"
          iconAccessibilityLabel="Info"
          message="Idea Pins are now available across platforms."
        />
        <BannerSlim
          type="infoBare"
          iconAccessibilityLabel="Info"
          message="Idea Pins are now available across platforms."
        />
      </Flex>
    </Box>
  );
}
