import { Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Text inline>
        Go to{' '}
        <Link
          display="inline"
          externalLinkIcon="default"
          href="https://developers.pinterest.com/account-setup/"
          target="blank"
        >
          My Apps
        </Link>
        .
      </Text>
    </Flex>
  );
}
