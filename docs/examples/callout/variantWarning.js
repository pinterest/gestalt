// @flow strict
import { type Node } from 'react';
import { Callout, Flex, Box } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingY={8} paddingX={8}>
        <Callout
          dismissButton={{
            accessibilityLabel: 'Dismiss warning',
            onDismiss: () => {},
          }}
          iconAccessibilityLabel="Warning"
          message="We have noticed that you have audiences in your advertiser account that have been used in an ad campaign. Pinterest will be deleting any unused audiences on May 30, 2020."
          primaryAction={{
            accessibilityLabel: 'View unused audiences',
            href: 'https://pinterest.com',
            label: 'View audiences',
            target: 'blank',
          }}
          title="Unused audiences are going away"
          type="warning"
        />
      </Box>
    </Flex>
  );
}
