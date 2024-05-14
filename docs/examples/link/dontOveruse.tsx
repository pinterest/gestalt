import { Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }} width="90%">
        <Text inline>
          - Comply with our{' '}
          <Link
            display="inlineBlock"
            externalLinkIcon="default"
            href="https://policy.pinterest.com/en/developer-guidelines"
          >
            Development guidelines
          </Link>{' '}
          or ensure you are currently logged into an existing
          <Link
            display="inlineBlock"
            externalLinkIcon="default"
            href="https://help.pinterest.com/en/business/article/get-a-business-account#section-8746"
          >
            business account.
          </Link>
        </Text>
        <Text inline>
          -{' '}
          <Link display="inlineBlock" externalLinkIcon="default" href="">
            Create a Pinterest business account
          </Link>{' '}
          or ensure you are currently logged into an existing{' '}
          <Link
            display="inlineBlock"
            externalLinkIcon="default"
            href="https://help.pinterest.com/en/business/article/get-a-business-account#section-8746"
          >
            business account
          </Link>
        </Text>
        <Text inline>
          -{' '}
          <Link
            display="inlineBlock"
            externalLinkIcon="default"
            href="https://developers.pinterest.com/account-setup/"
          >
            Go to My Apps
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
