// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerCallout, Box, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingX={8} paddingY={8}>
        <BannerCallout
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
            role: 'link',
          }}
          title="Advertise with confidence!"
          type="recommendation"
        />
      </Box>
    </Flex>
  );
}
