import { ReactNode } from 'react';
import { BannerCallout, BannerSlim, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 2, row: 0 }} width="100%">
        <BannerCallout
          dismissButton={{
            accessibilityLabel: 'Dismiss this banner',
            onDismiss: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="Measure the impact tags have on your business by adding and managing tags"
          primaryAction={{
            accessibilityLabel: 'Get started with tags',
            href: 'https://pinterest.com',
            label: 'Get started with tags',
            target: 'blank',
            role: 'link',
          }}
          title="Use Tag manager to optimize your advertiser spend"
          type="info"
        />
        <BannerSlim
          iconAccessibilityLabel="Warning"
          message="You haven't added any tags."
          type="warning"
        />
      </Flex>
    </Box>
  );
}
