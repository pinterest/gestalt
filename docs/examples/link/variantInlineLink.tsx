import { ReactNode } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Flex direction="row" width="90%" wrap>
        <Text inline>
          Find tips and best practices on the{' '}
          <Link display="inline" href="https://business.pinterest.com/">
            Pinterest Business Site{' '}
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
