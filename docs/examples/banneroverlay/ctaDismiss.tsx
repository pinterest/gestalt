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
// @ts-expect-error - TS2741 - Property 'onDismiss' is missing in type '{ message: string; offset: { top: number; bottom: number; }; primaryAction: { role: "button"; onClick: () => void; label: string; accessibilityLabel: string; }; thumbnail: { icon: Element; }; title: string; zIndex: FixedZIndex; }' but required in type 'BannerOverlayProps'.
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
