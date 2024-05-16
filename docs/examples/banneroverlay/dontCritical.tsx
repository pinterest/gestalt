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
          Oops, something went wrong!{' '}
          <Link display="inlineBlock" href="#" target="self">
            Download the app
          </Link>{' '}
          instead.
        </Text>
      }
      offset={{ top: 130, bottom: 24 }}
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
      zIndex={new FixedZIndex(100)}
    />
  );
}
