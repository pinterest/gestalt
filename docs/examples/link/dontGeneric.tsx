import {ReactNode} from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Text>
        For more information,{' '}
        <Text inline>
          <Link
            accessibilityLabel="visit https://pinterest.com"
            display="inline"
            href="https://pinterest.com"
          >
            click here
          </Link>
        </Text>
      </Text>
    </Flex>
  );
}
