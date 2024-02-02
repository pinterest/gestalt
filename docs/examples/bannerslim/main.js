// @flow strict
import React, { type Node as ReactNode } from 'react';
import { BannerSlim, Box } from 'gestalt';

export default function ResponsiveExample(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center">
      <BannerSlim
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
          role: 'button',
        }}
        type="info"
      />
    </Box>
  );
}
