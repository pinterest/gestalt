// @flow strict
import { type Node } from 'react';
import { Box, Flex, SlimBanner } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <SlimBanner
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
        <SlimBanner
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
