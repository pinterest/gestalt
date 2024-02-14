// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerCallout, Box, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingY={8} paddingX={8}>
        <BannerCallout
          dismissButton={{
            accessibilityLabel: 'Dismiss this banner',
            onDismiss: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="Earn $60 of ads credit, and send $30 of ads credit to a friend"
          primaryAction={{
            accessibilityLabel: 'Send ads invite',
            label: 'Send invite',
            role: 'button',
          }}
          title="Give $30, get $60 in ads credit"
          type="info"
        />
      </Box>
    </Flex>
  );
}
