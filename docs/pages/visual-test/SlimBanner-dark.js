// @flow strict
import { type Node } from 'react';
import { SlimBanner, Flex, Box, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <Flex direction="column" gap={1} width={400}>
          <SlimBanner message="Your total audience includes all users who have seen your Pins." />
          {['error', 'success', 'warning', 'info'].map((status) => (
            <SlimBanner
              key={status}
              status={status}
              message={`This is a/an ${status} message.`}
              iconAccessibilityLabel="test"
              helperLink={{
                text: 'Learn more',
                accessibilityLabel: 'Learn more Pinterest.com',
                href: 'http://www.pinterest.com',
                onClick: () => {},
              }}
            />
          ))}
          {['error', 'success', 'warning', 'info'].map((status) => (
            <SlimBanner
              key={status}
              type="light"
              status={status}
              message={`This is a/an ${status} message.`}
              iconAccessibilityLabel="test"
            />
          ))}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
