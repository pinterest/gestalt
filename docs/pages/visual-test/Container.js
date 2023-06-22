// @flow strict
import { type Node } from 'react';
import { Box, Container, Text } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box color="secondary" display="inlineBlock" padding={1} width={900}>
      <Container>
        <Box color="infoWeak" padding={3}>
          <Text>This is a 800px container</Text>
        </Box>
      </Container>
    </Box>
  );
}
