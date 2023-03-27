// @flow strict
import React, { type Node } from 'react';
import { Callout, Flex } from 'gestalt';

export default function ResponsiveExample(): Node {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Callout
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
        }}
        secondaryAction={{
          accessibilityLabel: 'Learn more: Verified Merchant Program',
          href: 'https://pinterest.com',
          label: 'Learn more',
          target: 'blank',
        }}
        title="Your business account was created!"
        type="info"
      />
    </Flex>
  );
}
