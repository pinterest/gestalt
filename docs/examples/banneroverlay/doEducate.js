// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { BannerOverlay, Button, FixedZIndex, Image, Link, Text } from 'gestalt';

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
      onDismiss={() => {
        setShowComponent(false);
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
    />
  );
}
