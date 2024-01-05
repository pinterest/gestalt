// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Avatar, BannerOverlay, Button, FixedZIndex, Link, Text } from 'gestalt';

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
          Discover trending{' '}
          <Link display="inlineBlock" target="self" href="#">
            fashion
          </Link>{' '}
          ideas in the app!
        </Text>
      }
      primaryAction={{
        role: 'button',
        onClick: () => {
          setShowComponent(false);
        },
        label: 'Get the app',
        accessibilityLabel: 'Get the app',
      }}
      onDismiss={() => {
        setShowComponent(false);
      }}
      thumbnail={{
        avatar: <Avatar src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />,
      }}
    />
  );
}
