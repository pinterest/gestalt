// @flow strict
import { type Node } from 'react';
import { Flex, ActivationCard, Box } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box color="white" display="inlineBlock" padding={1}>
      <Flex direction="column" gap={2}>
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
        <ActivationCard
          message="Tag is installed and healthy"
          status="complete"
          statusMessage="Completed"
          title="Nice work"
        />
      </Flex>
    </Box>
  );
}
