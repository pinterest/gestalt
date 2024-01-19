// @flow strict
import { Fragment, type Node as ReactNode, useState } from 'react';
import { Avatar, BannerOverlay, Button, FixedZIndex, Image } from 'gestalt';

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
    <Fragment>
      <BannerOverlay
        zIndex={new FixedZIndex(100)}
        offset={{ top: 130, bottom: 24 }}
        title="More to explore"
        message="Discover more ideas!"
        onDismiss={() => {
          setShowComponent(false);
        }}
        thumbnail={{
          avatar: <Avatar src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />,
        }}
      />
      <BannerOverlay
        zIndex={new FixedZIndex(100)}
        offset={{ top: 220, bottom: 114 }}
        title="Mmmmm...tasty!"
        message="Make similar recipes!"
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
    </Fragment>
  );
}
