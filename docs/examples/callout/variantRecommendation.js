// @flow strict
import { type Node } from 'react';
import { Box, Callout, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingY={8} paddingX={8}>
        <Callout
          dismissButton={{
            accessibilityLabel: 'Dismiss this banner',
            onDismiss: () => {},
          }}
          iconAccessibilityLabel="Recommendation"
          message="When you run ads on Pinterest, you'll find recommendations to improve them here."
          primaryAction={{
            accessibilityLabel: 'Learn more: Ads on Pinterest',
            href: 'https://pinterest.com',
            label: 'Learn more',
            target: 'blank',
          }}
          title="Advertise with confidence!"
          type="recommendation"
        />
      </Box>
    </Flex>
  );
}
