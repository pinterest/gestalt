import {ReactNode} from 'react';
import { Box, Container, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box color="secondary" height="100%" paddingX={3} paddingY={6} width="100%">
        <Container>
          <Box color="default" padding={3}>
            <Text>Centered content</Text>
          </Box>
        </Container>
      </Box>
    </Flex>
  );
}
