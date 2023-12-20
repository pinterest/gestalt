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
      title="BannerOverlay"
      message={
        <Text inline>
          Saved to{' '}
          <Link display="inlineBlock" target="blank" href="#">
            Sushi time
          </Link>
        </Text>
      }
      onDismiss={() => {
        setShowComponent(false);
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
    />
  );
}
