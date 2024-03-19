// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerCallout, Box, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingY={8} paddingX={8}>
        <BannerCallout
          dismissButton={{
            accessibilityLabel: 'Dismiss this banner',
            onDismiss: () => {},
          }}
          iconAccessibilityLabel="Success"
          message="Keep it up by using recommendations to optimize your ad spend."
          primaryAction={{
            accessibilityLabel: 'Get started: Ad recommendations',
            href: 'https://pinterest.com',
            label: 'Get started',
            target: 'blank',
            role: 'link',
          }}
          title="Your ads are doing great!"
          type="success"
        />
      </Box>
    </Flex>
  );
}
