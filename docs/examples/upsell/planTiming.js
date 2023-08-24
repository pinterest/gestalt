// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Text, Upsell } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 4, row: 0 }} direction="column">
        <Text>First Upsell:</Text>
        <Upsell
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {},
          }}
          imageData={{
            component: <Icon icon="ads-stats" accessibilityLabel="" color="default" size={32} />,
          }}
          message="Install the Pinterest tag to track your website traffic, conversions and more."
          primaryAction={{ label: 'Install now', accessibilityLabel: 'Install Pinterest tag now' }}
          secondaryAction={{
            accessibilityLabel: 'Learn more: Pinterest tag',
            href: 'https://help.pinterest.com/en/business/article/verified-merchant-program',
            label: 'Learn more',
            target: 'blank',
          }}
          title="Measure ad performance"
        />

        <Text>Follow-up Upsell:</Text>
        <Upsell
          imageData={{
            component: <Icon icon="send" accessibilityLabel="" color="default" size={32} />,
          }}
          message="Track ads conversion—sales, traffic and more—with the Pinterest tag"
          primaryAction={{ label: 'Claim now', accessibilityLabel: 'Claim ads credit' }}
          title="So close! Finish installing your Pinterest tag, get $10 in ads credit"
        />
      </Flex>
    </Box>
  );
}
