// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <Box color="default" display="inlineBlock" padding={4}>
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 2,
        }}
      >
        <Text inline>
          Visit our{' '}
          <Link display="inlineBlock" href="https://pinterest.com">
            Business Help Center
          </Link>
        </Text>
        <Text inline size="400" color="success">
          <Link
            href="https://authy.com/download/"
            display="inlineBlock"
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
  );
}
