// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, TapAreaLink, Text } from 'gestalt';

export default function TapAreaExample(): ReactNode {
  return (
    <Flex wrap gap={2}>
      {['copy', 'grab', 'grabbing', 'move', 'noDrop', 'pointer', 'zoomIn', 'zoomOut'].map(
        (cursor) => (
          <TapAreaLink
            href="www.pinterest.com"
            onTap={({ event }) => event.stopPropagation()}
            key={cursor}
            mouseCursor={cursor}
            fullWidth={false}
          >
            <Box borderStyle="lg" padding={4} width={250} height={100}>
              <Text size="200">hover here </Text>
              <Text size="200" weight="bold">
                {`mouseCursor="${cursor}"`}
              </Text>
            </Box>
          </TapAreaLink>
        ),
      )}
    </Flex>
  );
}
