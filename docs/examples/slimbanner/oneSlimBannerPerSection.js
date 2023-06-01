// @flow strict
import { type Node } from 'react';
import { SlimBanner, Box } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <SlimBanner
        type="info"
        message="Tag manager can help you optimize your advertiser spend."
        iconAccessibilityLabel="Information"
        helperLink={{
          text: 'Get started',
          accessibilityLabel: 'Get started with Tag manager',
          href: 'http://www.pinterest.com',
          onClick: () => {},
        }}
      />
    </Box>
  );
}
