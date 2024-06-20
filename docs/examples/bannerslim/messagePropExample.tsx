import { BannerSlim, Box, Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8}>
      <Flex direction="column" gap={6}>
        <Text weight="bold">Simple message string with helperText</Text>
        <BannerSlim
          helperLink={{
            text: 'Learn more',
            accessibilityLabel: 'Learn more about campaign budget optimization',
            href: 'http://www.pinterest.com',
            onClick: () => {},
          }}
          iconAccessibilityLabel="Information"
          message="This ad group is part of a campaign that is using campaign budget optimization. Changes to schedule or budget must be made at the campaign level."
          type="info"
        />

        <Text weight="bold">Rich message with Text component</Text>

        <BannerSlim
          iconAccessibilityLabel="Recommendation"
          message={
            <Text inline>
              {' '}
              The campaign{' '}
              <Text inline weight="bold">
                Back to School
              </Text>{' '}
              is regularly hitting its{' '}
              <Link display="inline" href="">
                daily cap
              </Link>
              . Consider raising daily caps to increase scale for a similar CPC and CTR.
            </Text>
          }
          onDismiss={() => {}}
          primaryAction={{
            accessibilityLabel: 'Increase spend',
            label: 'Increase spend',
            onClick: () => {},
            role: 'button',
          }}
          type="recommendation"
        />
      </Flex>
    </Box>
  );
}
