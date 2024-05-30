import { useState } from 'react';
import { BannerOverlay, Button, FixedZIndex, Icon } from 'gestalt';

export default function Example() {
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
      message="You can have up to two buttons in the BannerOverlay!"
      offset={{ top: 130, bottom: 24 }}
      onDismiss={() => {
        setShowComponent(false);
      }}
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
      thumbnail={{
        icon: <Icon accessibilityLabel="Sparkle" color="info" icon="info-circle" />,
      }}
      title="Call to Action"
      zIndex={new FixedZIndex(100)}
    />
  );
}
