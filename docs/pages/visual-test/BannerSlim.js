// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerSlim, Box, Flex } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box padding={1}>
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 1,
        }}
        width={400}
      >
        <BannerSlim message="Your total audience includes all users who have seen your Pins." />
        {[
          'error',
          'success',
          'warning',
          'info',
          'recommendation',
          'errorBare',
          'successBare',
          'warningBare',
          'infoBare',
          'recommendationBare',
        ].map((type) => (
          <BannerSlim
            key={type}
            type={type}
            message={`This is a/an ${type} message.`}
            iconAccessibilityLabel="test"
            helperLink={{
              text: 'Learn more',
              accessibilityLabel: 'Learn more Pinterest.com',
              href: 'http://www.pinterest.com',
              onClick: () => {},
            }}
          />
        ))}
      </Flex>
    </Box>
  );
}
