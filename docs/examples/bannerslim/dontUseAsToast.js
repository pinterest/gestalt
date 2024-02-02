// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, BannerSlim } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <BannerSlim
        type="success"
        message="The Pin was added to your"
        iconAccessibilityLabel="Information"
        helperLink={{
          text: 'Vision Board',
          accessibilityLabel: 'Vision Board',
          href: 'http://www.pinterest.com',
          onClick: () => {},
        }}
      />
    </Box>
  );
}
