// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerSlim, Box } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <BannerSlim
        helperLink={{
          text: 'Get started',
          accessibilityLabel: 'Get started with Tag manager',
          href: 'http://www.pinterest.com',
          onClick: () => {},
        }}
        iconAccessibilityLabel="Information"
        message="Tag manager can help you optimize your advertiser spend."
        type="info"
      />
    </Box>
  );
}
