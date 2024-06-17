import React from 'react';
import { BannerSlim, Box } from 'gestalt';

export default function ResponsiveExample() {
  return (
    <Box alignItems="center" display="flex" height="100%" padding={8}>
      <BannerSlim
        iconAccessibilityLabel="Information"
        message="Idea Pins are now available across platforms."
        onDismiss={() => {}}
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
