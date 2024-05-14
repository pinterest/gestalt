import { useState } from 'react';
import { BannerOverlay, Button, FixedZIndex, Image, Link, Text } from 'gestalt';

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
      message={
        <Text inline>
          Discover trending{' '}
          <Link display="inlineBlock" href="#" target="self">
            fashion
          </Link>{' '}
          ideas in the app!
        </Text>
      }
      offset={{ top: 130, bottom: 24 }}
      onDismiss={() => {
        setShowComponent(false);
      }}
      primaryAction={{
        role: 'button',
        onClick: () => {
          setShowComponent(false);
        },
        label: 'Get the app',
        accessibilityLabel: 'Get the app',
      }}
      // @ts-expect-error - TS2322 - Type '{ message: Element; offset: { top: number; bottom: number; }; onDismiss: () => void; primaryAction: { role: "button"; onClick: () => void; label: string; accessibilityLabel: string; }; secondaryAction: { ...; }; thumbnail: { ...; }; title: string; zIndex: FixedZIndex; }' is not assignable to type 'IntrinsicAttributes & BannerOverlayProps'.
      secondaryAction={{
        role: 'button',
        onClick: () => {},
        label: 'Not now',
        accessibilityLabel: 'Not now',
      }}
      thumbnail={{
        image: (
          <Image
            alt="Pinterest Logo"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/LQc8ynn/image.png"
          />
        ),
      }}
      title="More to Explore"
      zIndex={new FixedZIndex(100)}
    />
  );
}
