import { Fragment, useState } from 'react';
import { BannerOverlay, Button, FixedZIndex, Icon } from 'gestalt';

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
    <Fragment>
      <BannerOverlay
        message="Discover more ideas!"
        offset={{ top: 130, bottom: 24 }}
        onDismiss={() => {
          setShowComponent(false);
        }}
        thumbnail={{
        icon: <Icon accessibilityLabel="" color="brandPrimary" icon="pinterest" />,
        }}
        title="More to explore"
        zIndex={new FixedZIndex(100)}
      />
      <BannerOverlay
        message="Make similar recipes!"
        offset={{ top: 220, bottom: 114 }}
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
        icon: <Icon accessibilityLabel="" color="brandPrimary" icon="pinterest" />,
        }}
        title="Mmmmm...tasty!"
        zIndex={new FixedZIndex(100)}
      />
    </Fragment>
  );
}
