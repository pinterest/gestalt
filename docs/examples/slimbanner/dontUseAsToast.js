// @flow strict
import { type Node } from 'react';
import { Box, SlimBanner } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <SlimBanner
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
