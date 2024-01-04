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
      zIndex={new FixedZIndex(100)}
      offset={{ top: 130, bottom: 24 }}
      title="More to Explore"
      message={
        <Text inline>
          Discover trending fashion ideas
          <Link display="inlineBlock" target="self" href="#">
            in the app
          </Link>
          !
        </Text>
      }
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
        icon: <Icon accessibilityLabel="Sparkle" icon="sparkle" color="recommendation" />,
      }}
    />
  );
}
