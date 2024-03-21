// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerUpsell, Box, Flex, Icon } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <BannerUpsell
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {},
          }}
          imageData={{
            component: <Icon accessibilityLabel="" color="default" icon="ads-stats" size={32} />,
          }}
          message="Install the Pinterest tag to track your website traffic, conversions and more."
          primaryAction={{
            label: 'Install now',
            accessibilityLabel: 'Install Pinterest tag',
            role: 'button',
            onClick: () => {},
          }}
          title="Measure ad performance"
        />
        <BannerUpsell
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {},
          }}
          imageData={{
            component: <Icon accessibilityLabel="" color="default" icon="ads-stats" size={32} />,
          }}
          message="Install the Pinterest tag to track your website traffic, conversions and more."
          primaryAction={{
            label: 'Install now',
            accessibilityLabel: 'Install Pinterest tag',
            role: 'button',
            onClick: () => {},
          }}
          title="Measure ad performance"
        />
      </Flex>
    </Box>
  );
}
