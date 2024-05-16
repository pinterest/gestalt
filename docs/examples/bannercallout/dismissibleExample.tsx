import { BannerCallout, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingX={8} paddingY={8}>
        <BannerCallout
          dismissButton={{
            accessibilityLabel: 'Dismiss this banner',
            onDismiss: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="Apply to the Verified Merchant Program"
          primaryAction={{
            accessibilityLabel: 'Get started: Verified Merchant Program',
            href: 'https://pinterest.com',
            label: 'Get started',
            target: 'blank',
            role: 'link',
          }}
          secondaryAction={{
            accessibilityLabel: 'Learn more: Verified Merchant Program',
            href: 'https://pinterest.com',
            label: 'Learn more',
            target: 'blank',
            role: 'link',
          }}
          title="Your business account was created!"
          type="info"
        />
      </Box>
    </Flex>
  );
}
