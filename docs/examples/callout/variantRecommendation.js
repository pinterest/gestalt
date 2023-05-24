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
  );
}
