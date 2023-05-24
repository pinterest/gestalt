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
      message="Earn $60 of ads credit, and send $30 of ads credit to a friend"
      primaryAction={{
        accessibilityLabel: 'Send ads invite',
        label: 'Send invite',
      }}
      title="Give $30, get $60 in ads credit"
      type="info"
    />
  );
}
