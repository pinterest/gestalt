// @flow strict
import { type Node } from 'react';
import { Box, Image, Upsell } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Upsell
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
        }}
        title="Stay healthy and safe"
      />
    </Box>
  );
}
