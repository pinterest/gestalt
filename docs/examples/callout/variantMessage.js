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
              It may take up to 10 minutes to automatically detect a newly installed tag. If you
              would like to manually verify your tag, please click the{' '}
              <Text inline weight="bold">
                Verify Tag
              </Text>{' '}
              button.
            </Text>
          }
          primaryAction={{
            accessibilityLabel: 'Manually verify tag',
            label: 'Verify Tag',
          }}
          title="We have not yet detected your tag"
          type="info"
        />
      </Box>
    </Flex>
  );
}
