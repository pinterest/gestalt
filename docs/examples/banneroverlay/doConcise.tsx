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
          Discover trending fashion ideas{' '}
          <Link display="inlineBlock" href="#" target="self">
            in the app
          </Link>
          !
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
        icon: <Icon accessibilityLabel="Sparkle" color="recommendation" icon="sparkle" />,
      }}
      title="More to Explore"
      zIndex={new FixedZIndex(100)}
    />
  );
}
