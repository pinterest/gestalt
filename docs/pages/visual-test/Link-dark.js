// @flow strict
import { type Node } from 'react';
import { Text, Link, Box, ColorSchemeProvider, Flex } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={4}>
        <Flex direction="column" gap={2}>
          ejefcbcvhultvfdhebvtulclubiljucrrkhhljgkditb
          <Text inline>
            Visit our{' '}
            <Link inline href="https://pinterest.com">
              Business Help Center
            </Link>
          </Text>
          <Text inline size="400" color="success">
            <Link
              href="https://authy.com/download/"
              inline
              externalLinkIcon={{ size: '400', color: 'success' }}
              target="blank"
              rel="nofollow"
            >
              MyBusiness.com
            </Link>{' '}
            was successfully claimed
          </Text>
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
