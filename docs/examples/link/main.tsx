import { ReactNode } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center">
        <Text inline>
          To see how you can grow your business, visit{' '}
          <Link
            display="inlineBlock"
            externalLinkIcon="default"
            href="https://business.pinterest.com/advertise"
            target="blank"
          >
            Pinterest Ads
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
