// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerSlim, Box, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <BannerSlim
          type="error"
          iconAccessibilityLabel="Info"
          message="There are issues with your account."
          helperLink={{
            text: 'Go to account',
            accessibilityLabel: 'Go to your account',
            href: 'http://www.pinterest.com',
            onClick: () => {},
          }}
        />
        <BannerSlim
          type="errorBare"
          iconAccessibilityLabel="Info"
          message="There are issues with your account."
          helperLink={{
            text: 'Go to account',
            accessibilityLabel: 'Go to your account',
            href: 'http://www.pinterest.com',
            onClick: () => {},
          }}
        />
      </Flex>
    </Box>
  );
}
