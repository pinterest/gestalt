// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { BannerOverlay, Button, FixedZIndex, Icon, Link, Text } from 'gestalt';

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
      thumbnail={{
        icon: <Icon accessibilityLabel="Sparkle" color="recommendation" icon="sparkle" />,
      }}
      title="More to Explore"
      zIndex={new FixedZIndex(100)}
    />
  );
}
