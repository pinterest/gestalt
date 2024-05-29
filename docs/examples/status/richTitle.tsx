import { Box, Flex, Heading, Link, Status, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={4}>
        <Heading accessibilityLevel="none" size="300">
          Health dashboard
        </Heading>
        <Flex direction="column" gap={2}>
          <Text weight="bold">Merchant status</Text>
          <Status
            title={
              <Text>
                <Link
                  accessibilityLabel="Your merchant account needs attention"
                  display="inline"
                  href=""
                  onClick={({ event, dangerouslyDisableOnNavigation }) => {
                    dangerouslyDisableOnNavigation?.();
                    event.preventDefault();
                  }}
                >
                  Needs attention
                </Link>
              </Text>
            }
            type="unstarted"
          />
        </Flex>
        <Flex direction="column" gap={2}>
          <Text weight="bold">Shopify</Text>
          <Status
            title={
              <Text>
                <Link
                  accessibilityLabel="Your Shoppify account is connected"
                  display="inline"
                  href=""
                  onClick={({ event, dangerouslyDisableOnNavigation }) => {
                    dangerouslyDisableOnNavigation?.();
                    event.preventDefault();
                  }}
                >
                  Connected
                </Link>
              </Text>
            }
            type="queued"
          />
        </Flex>
        <Flex direction="column" gap={2}>
          <Text weight="bold">API for conversions</Text>
          <Status
            title={
              <Text>
                <Link
                  accessibilityLabel="Your API is correctly set up"
                  display="inline"
                  href=""
                  onClick={({ event, dangerouslyDisableOnNavigation }) => {
                    dangerouslyDisableOnNavigation?.();
                    event.preventDefault();
                  }}
                >
                  Good setup
                </Link>
              </Text>
            }
            type="inProgress"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
