import { Box, Flex, Link, Text } from 'gestalt';

export default function Screenshot() {
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
        <Text color="success" inline size="400">
          <Link
            display="inlineBlock"
            externalLinkIcon={{ size: '400' }}
            href="https://authy.com/download/"
            rel="nofollow"
            target="blank"
          >
            MyBusiness.com
          </Link>{' '}
          was successfully claimed
        </Text>
      </Flex>
    </Box>
  );
}
