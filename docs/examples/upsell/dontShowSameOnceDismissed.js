// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Upsell } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Upsell
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {},
          }}
          imageData={{
            component: <Icon icon="ads-stats" accessibilityLabel="" color="default" size={32} />,
          }}
          message="Install the Pinterest tag to track your website traffic, conversions and more."
          primaryAction={{ label: 'Install now', accessibilityLabel: 'Install Pinterest tag' }}
          title="Measure ad performance"
        />
        <Upsell
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {},
          }}
          imageData={{
            component: <Icon icon="ads-stats" accessibilityLabel="" color="default" size={32} />,
          }}
          message="Install the Pinterest tag to track your website traffic, conversions and more."
          primaryAction={{ label: 'Install now', accessibilityLabel: 'Install Pinterest tag' }}
          title="Measure ad performance"
        />
      </Flex>
    </Box>
  );
}
