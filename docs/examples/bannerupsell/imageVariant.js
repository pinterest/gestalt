// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerUpsell, Box, Image } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <BannerUpsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: (
            <Image
              alt=""
              color="rgb(231, 186, 176)"
              naturalHeight={751}
              naturalWidth={564}
              src="https://i.ibb.co/7bQQYkX/stock2.jpg"
            />
          ),
          mask: { rounding: 4 },
          width: 128,
        }}
        message="Check out our resources for adapting to these times."
        primaryAction={{
          href: 'https://pinterest.com',
          label: 'Visit',
          accessibilityLabel: 'Visit our Stay Safe resources',
          target: 'blank',
          role: 'link',
        }}
        title="Stay healthy and safe"
      />
    </Box>
  );
}
