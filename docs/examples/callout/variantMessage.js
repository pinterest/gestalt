// @flow strict
import React, { type Node } from 'react';
import { Box, Callout, Flex, Text } from 'gestalt';

export default function ResponsiveExample(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingY={8} paddingX={8}>
        <Callout
          dismissButton={{
            accessibilityLabel: 'Dismiss this banner',
            onDismiss: () => {},
          }}
          iconAccessibilityLabel="Info"
          message={
            <Text inline>
              You have invited{' '}
              <Text inline weight="bold">
                Leaf Media Agency
              </Text>{' '}
              to your business hierarchy. Once they accept, you will be able to manage their
              business account.
            </Text>
          }
          primaryAction={{
            accessibilityLabel: 'Resend invite',
            label: 'Resend invite',
          }}
          secondaryAction={{
            accessibilityLabel: 'Cancel invite',
            label: 'Cancel invite',
          }}
          title="You've sent an invite"
          type="info"
        />
      </Box>
    </Flex>
  );
}
