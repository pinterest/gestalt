// @flow strict
import { type Node } from 'react';
import { SlimBanner, Flex, Box } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box padding={1}>
      <Flex direction="column" gap={1} width={400}>
        <SlimBanner message="Your total audience includes all users who have seen your Pins." />
        {[
          'error',
          'success',
          'warning',
          'info',
          'errorBare',
          'successBare',
          'warningBare',
          'infoBare',
        ].map((type) => (
          <SlimBanner
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
