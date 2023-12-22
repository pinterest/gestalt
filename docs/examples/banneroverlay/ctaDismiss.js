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
      title="Dismissable Banner"
      message="You can dismiss this banner with the primary action!"
      primaryAction={{
        role: 'button',
        onClick: () => {
          setShowComponent(false);
        },
        label: 'Got it!',
        accessibilityLabel: 'Got it!',
      }}
      thumbnail={{
        icon: <Icon accessibilityLabel="Sparkle" icon="info-circle" color="info" />,
      }}
    />
  );
}
