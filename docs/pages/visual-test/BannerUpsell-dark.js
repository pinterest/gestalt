// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerUpsell, Box, ColorSchemeProvider, Icon } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" padding={5}>
        <BannerUpsell
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {},
          }}
          imageData={{
            component: <Icon icon="pinterest" accessibilityLabel="" color="default" size={32} />,
          }}
          message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
          primaryAction={{
            href: 'https://pinterest.com',
            label: 'Send invite',
            accessibilityLabel: 'Invite friend to use ads',
            target: 'blank',
            role: 'link',
          }}
          title="Give $30, get $60 in ads credit"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
