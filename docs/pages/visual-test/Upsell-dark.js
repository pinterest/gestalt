// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Icon, Upsell } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" padding={5}>
        <Upsell
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
