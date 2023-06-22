// @flow strict
import { type Node } from 'react';
import { ActivationCard, Box, ColorSchemeProvider, Flex } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 2,
          }}
        >
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
    </ColorSchemeProvider>
  );
}
