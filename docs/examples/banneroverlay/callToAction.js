// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { BannerOverlay, Button, FixedZIndex, Icon } from 'gestalt';

export default function Example(): ReactNode {
  const [showComponent, setShowComponent] = useState(true);

  return !showComponent ? (
    <Button
      onClick={() => {
        setShowComponent(true);
      }}
      text="Show BannerOverlay"
    />
  ) : (
    <BannerOverlay
      zIndex={new FixedZIndex(100)}
      offset={{ top: 130, bottom: 24 }}
      title="Call to Action"
      message="You can have up to two buttons in the BannerOverlay!"
      primaryAction={{
        role: 'button',
        onClick: () => {
          setShowComponent(false);
        },
        label: 'Primary action',
        accessibilityLabel: 'Primary action',
      }}
      secondaryAction={{
        role: 'button',
        onClick: () => {},
        label: 'Secondary Action',
        accessibilityLabel: 'Secondary Action',
      }}
      onDismiss={() => {
        setShowComponent(false);
      }}
      thumbnail={{
        icon: <Icon accessibilityLabel="Sparkle" icon="info-circle" color="info" />,
      }}
    />
  );
}
