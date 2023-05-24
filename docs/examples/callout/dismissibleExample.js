// @flow strict
import { type Node } from 'react';
import { Callout } from 'gestalt';

export default function Example(): Node {
  return (
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
  );
}
