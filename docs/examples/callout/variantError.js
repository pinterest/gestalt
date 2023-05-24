// @flow strict
import { type Node } from 'react';
import { Callout } from 'gestalt';

export default function Example(): Node {
  return (
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
  );
}
