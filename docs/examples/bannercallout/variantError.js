// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerCallout, Box, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingY={8} paddingX={8}>
        <BannerCallout
          iconAccessibilityLabel="Error"
          message="Your tag has errors, so information may be outdated. Fix your tag for the most accurate metrics."
          primaryAction={{
            accessibilityLabel: 'Fix Pinterest tag',
            href: 'https://pinterest.com',
            label: 'Fix tag',
            target: 'blank',
            role: 'link',
          }}
          title="Pinterest tag needs attention"
          type="error"
        />
      </Box>
    </Flex>
  );
}
