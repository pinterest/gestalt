import { useState } from 'react';
import { BannerOverlay, Button, FixedZIndex, Icon, Link, Text } from 'gestalt';

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
      secondaryAction={{
        role: 'button',
        onClick: () => {},
        label: 'Not now',
        accessibilityLabel: 'Not now',
      }}
      thumbnail={{
        icon: <Icon accessibilityLabel="" color="brandPrimary" icon="pinterest" />,
      }}
      title="More to Explore"
      zIndex={new FixedZIndex(100)}
    />
  );
}
