// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerSlim, Box, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        {['infoBare', 'successBare', 'warningBare', 'errorBare', 'recommendationBare'].map(
          (type) => (
            <BannerSlim
              key={type}
              type={type}
              iconAccessibilityLabel={type}
              message="This is a compact BannerSlim."
            />
          ),
        )}
      </Flex>
    </Box>
  );
}
