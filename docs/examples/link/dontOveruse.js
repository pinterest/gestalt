// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 4, row: 0 }} direction="column" width="90%">
        <Text inline>
          - Comply with our{' '}
          <Link
            href="https://policy.pinterest.com/en/developer-guidelines"
            display="inlineBlock"
            externalLinkIcon="default"
          >
            Development guidelines
          </Link>{' '}
          or ensure you are currently logged into an existing
          <Link
            href="https://help.pinterest.com/en/business/article/get-a-business-account#section-8746"
            display="inlineBlock"
            externalLinkIcon="default"
          >
            business account.
          </Link>
        </Text>
        <Text inline>
          -{' '}
          <Link href="" display="inlineBlock" externalLinkIcon="default">
            Create a Pinterest business account
          </Link>{' '}
          or ensure you are currently logged into an existing{' '}
          <Link
            href="https://help.pinterest.com/en/business/article/get-a-business-account#section-8746"
            display="inlineBlock"
            externalLinkIcon="default"
          >
            business account
          </Link>
        </Text>
        <Text inline>
          -{' '}
          <Link
            href="https://developers.pinterest.com/account-setup/"
            display="inlineBlock"
            externalLinkIcon="default"
          >
            Go to My Apps
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
