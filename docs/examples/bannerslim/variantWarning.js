// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, BannerSlim } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <BannerSlim
          type="warning"
          iconAccessibilityLabel="Info"
          message="This feature is being sunset and will not be available after May 1, 2024."
          helperLink={{
            text: 'Learn more.',
            accessibilityLabel: 'Learn more about deprecated features',
            href: 'http://www.pinterest.com',
            onClick: () => {},
          }}
        />
        <BannerSlim
          type="warningBare"
          iconAccessibilityLabel="Info"
          message="This feature is being sunset and will not be available after May 1, 2024."
          helperLink={{
            text: 'Learn more.',
            accessibilityLabel: 'Learn more about deprecated features',
            href: 'http://www.pinterest.com',
            onClick: () => {},
          }}
        />
      </Flex>
    </Box>
  );
}
