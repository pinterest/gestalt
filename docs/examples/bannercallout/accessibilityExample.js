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
          iconAccessibilityLabel="Info"
          message="Apply to the Verified Merchant Program"
          primaryAction={{
            accessibilityLabel: 'Get started: Verified Merchant Program',
            href: 'https://pinterest.com',
            label: 'Get started',
            target: 'blank',
            role: 'link',
          }}
          secondaryAction={{
            accessibilityLabel: 'Learn more: Verified Merchant Program',
            href: 'https://pinterest.com',
            label: 'Learn more',
            target: 'blank',
            role: 'link',
          }}
          title="Your business account was created!"
          type="info"
        />
      </Box>
    </Flex>
  );
}
