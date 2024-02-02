// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, BannerSlim } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <BannerSlim
        type="info"
        message="This ad group is part of a campaign that is using campaign budget optimization. Changes to schedule or budget must be made at the campaign level."
        iconAccessibilityLabel="Information"
        primaryAction={{
          accessibilityLabel: 'Learn more about campaign budget optimization',
          label: 'Learn more',
          onClick: () => {},
          role: 'button',
        }}
      />
    </Box>
  );
}
