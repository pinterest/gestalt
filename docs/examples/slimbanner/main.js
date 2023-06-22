// @flow strict
import React, { type Node } from 'react';
import { Box, SlimBanner } from 'gestalt';

export default function ResponsiveExample(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center">
      <SlimBanner
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        iconAccessibilityLabel="Information"
        message="Idea Pins are now available across platforms."
        primaryAction={{
          accessibilityLabel: 'Apply for access',
          label: 'Apply for access',
          onClick: () => {},
        }}
        type="info"
      />
    </Box>
  );
}
