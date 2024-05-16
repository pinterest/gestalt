import { ReactNode, useState } from 'react';
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
      message="You can dismiss this banner with the primary action!"
      offset={{ top: 130, bottom: 24 }}
      primaryAction={{
        role: 'button',
        onClick: () => {
          setShowComponent(false);
        },
        label: 'Got it!',
        accessibilityLabel: 'Got it!',
      }}
      thumbnail={{
        icon: <Icon accessibilityLabel="Sparkle" color="info" icon="info-circle" />,
      }}
      title="Dismissable Banner"
      zIndex={new FixedZIndex(100)}
    />
  );
}
