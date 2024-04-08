// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { BannerOverlay, Button, FixedZIndex, Image } from 'gestalt';

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
      message="Discover new recipes today. Elevate your dinner with recipes like sheet-pan dinner and slow-cooker favorites. Find recipes will save your dinner routine."
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
      thumbnail={{
        image: (
          <Image
            alt="Vegan Teriyaki Sushi Burrito"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.pinimg.com/564x/ff/ee/52/ffee52eac6cd0f2f5dac8af3899a9f41.jpg"
          />
        ),
      }}
      title="You've got great taste!"
      zIndex={new FixedZIndex(100)}
    />
  );
}
