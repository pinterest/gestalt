import { Box, Flex, TapAreaLink, Text } from 'gestalt';

export default function TapAreaExample() {
  return (
    <Flex gap={2} wrap>
      {['copy', 'grab', 'grabbing', 'move', 'noDrop', 'pointer', 'zoomIn', 'zoomOut'].map(
        (cursor) => (
          <TapAreaLink
            key={cursor}
            fullWidth={false}
            href="www.pinterest.com"
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"move" | "copy" | "grab" | "grabbing" | "noDrop" | "pointer" | "zoomIn" | "zoomOut" | undefined'.
            mouseCursor={cursor}
            onTap={({ event }) => event.stopPropagation()}
          >
            <Box borderStyle="lg" height={100} padding={4} width={250}>
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
