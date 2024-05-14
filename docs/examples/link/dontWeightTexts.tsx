import { Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }} width="90%">
        <Text weight="bold"> Need help? </Text>
        <Text inline>
          {' '}
          Find tips and best practices on the
          <Text inline weight="bold">
            <Link display="inline" href="https://business.pinterest.com/" underline="hover">
              {' '}
              Pinterest Business Site{' '}
            </Link>
          </Text>
        </Text>
        <Text inline>
          {' '}
          Troubleshoot issues with the
          <Text inline weight="bold">
            <Link display="inline" href="https://help.pinterest.com" underline="hover">
              {' '}
              Pinterest Help Center{' '}
            </Link>
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
}
