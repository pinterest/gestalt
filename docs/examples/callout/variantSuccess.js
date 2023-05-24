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
      iconAccessibilityLabel="Success"
      message="Keep it up by using recommendations to optimize your ad spend."
      primaryAction={{
        accessibilityLabel: 'Get started: Ad recommendations',
        href: 'https://pinterest.com',
        label: 'Get started',
        target: 'blank',
      }}
      title="Your ads are doing great!"
      type="success"
    />
  );
}
