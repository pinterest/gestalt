// @flow strict
import { type Node } from 'react';
import { Box, Callout, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingY={8} paddingX={8}>
        <Callout
          iconAccessibilityLabel="Error"
          message="Your tag has errors, so information may be outdated. Fix your tag for the most accurate metrics."
          primaryAction={{
            accessibilityLabel: 'Fix Pinterest tag',
            href: 'https://pinterest.com',
            label: 'Fix tag',
            target: 'blank',
          }}
          title="Pinterest tag needs attention"
          type="error"
        />
      </Box>
    </Flex>
  );
}
