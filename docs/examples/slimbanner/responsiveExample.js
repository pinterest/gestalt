// @flow strict
import React, { type Node } from 'react';
import { Box, SlimBanner } from 'gestalt';

export default function ResponsiveExample(): Node {
  return (
    <Box padding={8}>
      <SlimBanner
        type="info"
        message="This ad group is part of a campaign that is using campaign budget optimization. Changes to schedule or budget must be made at the campaign level."
        iconAccessibilityLabel="Information"
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        primaryAction={{
          accessibilityLabel: 'Learn more about campaign budget optimization',
          label: 'Learn more',
          onClick: () => {},
        }}
      />
    </Box>
  );
}
