// @flow strict
import { type Node } from 'react';
import { Flex, SlimBanner, Box } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        {['infoBare', 'successBare', 'warningBare', 'errorBare', 'recommendationBare'].map(
          (type) => (
            <SlimBanner
              key={type}
              type={type}
              iconAccessibilityLabel={type}
              message="This is a compact SlimBanner."
            />
          ),
        )}
      </Flex>
    </Box>
  );
}
