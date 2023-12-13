// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, TapArea, Text } from 'gestalt';

export default function TapAreaExample(): ReactNode {
  return (
    <Flex wrap gap={2}>
      {[
        'copy',
        'grab',
        'grabbing',
        'move',
        'noDrop',
        'pointer',
        'zoomIn',
        'zoomOut',
        'default',
      ].map((cursor) => (
        <TapArea key={cursor} mouseCursor={cursor} fullWidth={false}>
          <Box borderStyle="lg" padding={4} width={250} height={100}>
            <Text size="200">hover here </Text>
            <Text size="200" weight="bold">
              {`mouseCursor="${cursor}"`}
            </Text>
          </Box>
        </TapArea>
      ))}
    </Flex>
  );
}
