import React, { ReactNode } from 'react';
import { BannerCallout, Box, Flex, Text } from 'gestalt';

export default function ResponsiveExample() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingX={8} paddingY={8}>
        <BannerCallout
          dismissButton={{
            accessibilityLabel: 'Dismiss this banner',
            onDismiss: () => {},
          }}
          iconAccessibilityLabel="Info"
// @ts-expect-error - TS2322 - Type 'Element' is not assignable to type 'string'.
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
            role: 'button',
          }}
          secondaryAction={{
            accessibilityLabel: 'Cancel invite',
            label: 'Cancel invite',
            role: 'button',
          }}
          title="You've sent an invite"
          type="info"
        />
      </Box>
    </Flex>
  );
}
