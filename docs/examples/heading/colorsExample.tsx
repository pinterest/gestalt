import { Box, Flex, Heading } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Box color="dark" padding={1}>
          <Heading color="inverse" size="600">
            Inverse
          </Heading>
        </Box>

        <Heading size="600">Default</Heading>

        <Heading color="subtle" size="600">
          Subtle
        </Heading>

        <Heading color="success" size="600">
          Success
        </Heading>

        <Heading color="error" size="600">
          Error
        </Heading>

        <Heading color="warning" size="600">
          Warning
        </Heading>

        <Heading color="shopping" size="600">
          Shopping
        </Heading>

        <Box color="primary" padding={1}>
          <Heading color="light" size="600">
            Light
          </Heading>
        </Box>

        <Box color="infoWeak" padding={1}>
          <Heading color="dark" size="600">
            Dark
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
}
