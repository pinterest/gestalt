// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, SlimBanner } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <SlimBanner
        type="info"
        message="This ad group is part of a campaign that is using campaign budget optimization. Changes to schedule or budget must be made at the campaign level."
        iconAccessibilityLabel="Information"
        helperLink={{
          text: 'Learn more',
          accessibilityLabel: 'Learn more about campaign budget optimization',
          href: 'http://www.pinterest.com',
          onClick: () => {},
        }}
      />
    </Box>
  );
}
