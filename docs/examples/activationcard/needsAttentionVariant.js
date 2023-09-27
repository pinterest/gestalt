// @flow strict
import { type Node } from 'react';
import { ActivationCard, Box, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex>
        <ActivationCard
          dismissButton={{
            accessibilityLabel: 'Dismiss card',
            onDismiss: () => {},
          }}
          link={{
            accessibilityLabel: 'Learn more about tag health',
            href: 'https://pinterest.com',
            label: 'Learn more',
          }}
          message="Oops! Your tag must be healthy to continue."
          status="needsAttention"
          statusMessage="Needs attention"
          title="Tag is unhealthy"
        />
      </Flex>
    </Box>
  );
}
