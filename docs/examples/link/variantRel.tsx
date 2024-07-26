import { Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }} width={300}>
        <Text inline size="100">
          Visit{' '}
          <Link
            display="inline"
            externalLinkIcon={{ size: '100' }}
            href="https://authy.com/download/"
            rel="nofollow"
            target="blank"
          >
            MyBusiness.com
          </Link>{' '}
          for shipping details
        </Text>
        <Text color="success" inline size="400">
          <Link
            display="inline"
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
    </Flex>
  );
}
