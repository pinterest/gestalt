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
      message="Bewerben Sie sich beim Verified Merchant Program"
      primaryAction={{
        accessibilityLabel: 'Loslegen: Verified Merchant Program',
        href: 'https://pinterest.com',
        label: 'Loslegen',
        target: 'blank',
      }}
      secondaryAction={{
        accessibilityLabel: 'Erfahren Sie mehr: Verified Merchant Program',
        href: 'https://pinterest.com',
        label: 'Erfahren Sie mehr',
        target: 'blank',
      }}
      title="Ihr Geschäftskonto wurde erstellt!"
      type="info"
    />
  );
}
