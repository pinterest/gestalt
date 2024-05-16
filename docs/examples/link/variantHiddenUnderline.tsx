import {ReactNode} from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <Text weight="bold">
        <Link display="inline" href="https://www.pinterest.com" underline="none">
          I&lsquo;m a link with no underline
        </Link>
      </Text>
    </Flex>
  );
}
